import os
import pandas
import dotenv
import requests
import psycopg2

from server.model import RiverCast
from datetime import datetime, timezone, timedelta

# load environment variables
dotenv.load_dotenv()

# forecast configurations
DATABASE_HOST = os.getenv("DATABASE_HOST")
DATABASE_USER = os.getenv("DATABASE_USER")
DATABASE_NAME = os.getenv("DATABASE_NAME")
DATABASE_PASS = os.getenv("DATABASE_PASS")
FORECAST_KEY = os.getenv("FORECAST_KEY")

WEATHER_STATIONS = {
    'Nangka': [14.67380015487957, 121.10952223297156],
    'Tumana': [14.65663836666501, 121.09607188249578],
    'Manalo': [14.636024333867782, 121.09322641787077],
    'Marcos': [14.626562059631189, 121.08221630844051],
    'Rosario': [14.590231696552385, 121.0829338500222],
    'Wawa': [14.728567715052451, 121.19183804554964]
}

RIVER_CONSTANTS = {
    'Nangka': 15.93,
    'Sto_Nino': 11.18,
    'Rodriguez': 21.30,
    'Tumana': 12.18,
    'Marcos': 12.75,
    'Manalo': 10.81,
    'Rosario': 10.74,
    'San_Mateo': 13.89
}


class Forecast:
    def __init__(self):
        # load model
        self.model = RiverCast()
        # load database
        self.conn = psycopg2.connect(
            host=DATABASE_HOST,
            database=DATABASE_NAME,
            user=DATABASE_USER,
            password=DATABASE_PASS
        )
        self.cur = self.conn.cursor()
        
    def update(self):
        # get weather forecast
        weather_data = []
        for station, coordinates in WEATHER_STATIONS.items():
            lat, lon = coordinates
            response = requests.get(f'https://api.weatherbit.io/v2.0/forecast/daily?key={FORECAST_KEY}&lon={lon}&lat={lat}&days=7')
            response = response.json()
            response = response['data']
            
            for forecast in response:
                weather_data.append({
                    'temperature': float(forecast['temp']),
                    'humidity': float(forecast['rh']),
                    'precipitation': float(forecast['precip']),
                    'wind_speed': float(forecast['wind_spd']),
                    'wind_direction': forecast['wind_cdir_full'],
                    'description': forecast['weather']['description'],
                    'station': station,
                    'forecast_at': datetime.strptime(forecast['datetime'], "%Y-%m-%d").isoformat() 
                })
        
        # save weather forecast  
        query = f"""
            INSERT INTO public.weather_forecast (temperature, humidity, precipitation, wind_speed, wind_direction, description, station, forecast_at)
            VALUES {', '.join([f"({data['temperature']}, {data['humidity']}, {data['precipitation']}, {data['wind_speed']}, '{data['wind_direction']}', '{data['description']}', '{data['station']}', '{data['forecast_at']}')" for data in weather_data])}
        """
        self.cur.execute(query)
        self.conn.commit()
        
        forecast = [{
            'recorded_at': data['forecast_at'],
            'station': data['station'],
            'temperature': float(data['temperature']),
            'humidity': float(data['humidity']),
            'wind_speed': float(data['wind_speed']),
            'precipitation': float(data['precipitation'])
        } for data in weather_data]
        
        # get river forecast
        # calculate date range
        end_date = datetime.now(timezone(timedelta(hours=8)))
        start_date = end_date - timedelta(days=82)
        
        # convert date range to string
        end_date = end_date.strftime('%Y-%m-%d')
        start_date = start_date.strftime('%Y-%m-%d')
        
        # get historical weather
        query = f"""
            SELECT DATE(recorded_at) AS day, station,
                MAX(temperature) AS temperature,
                MAX(humidity) AS humidity,
                MAX(wind_speed) AS wind_speed,
                MAX(precipitation) AS precipitation
            FROM public.weather_history
            WHERE recorded_at BETWEEN '{start_date}' AND '{end_date}'
            GROUP BY DATE(recorded_at), station
            ORDER BY DATE(recorded_at) ASC;
        """
        self.cur.execute(query)
        history = self.cur.fetchall()
        
        history = [{
            'recorded_at': data[0],
            'station': data[1],
            'temperature': float(data[2]),
            'humidity': float(data[3]),
            'wind_speed': float(data[4]),
            'precipitation': float(data[5])
        } for data in history]
        
        history = history + forecast
        
        df = pandas.DataFrame(history)
        df['recorded_at'] = pandas.to_datetime(df['recorded_at'])
        df = df.sort_values(by='recorded_at', ascending=True)
        
        weather = pandas.DataFrame()
        for station in ['Marcos', 'Manalo', 'Nangka', 'Rosario', 'Tumana', 'Wawa']:
            for feature in ['temperature', 'humidity', 'precipitation', 'wind_speed']:
                weather[f'{station}_{feature}'] = df[df['station'] == station][feature].values
        
        # get historical river
        query = f"""
            SELECT DATE(recorded_at) AS day, station,
                MAX(water_level) AS water_level
            FROM public.river_history
            WHERE recorded_at BETWEEN '{start_date}' AND '{end_date}'
            GROUP BY DATE(recorded_at), station
            ORDER BY DATE(recorded_at) ASC;
        """
        self.cur.execute(query)
        history = self.cur.fetchall()
        
        history = [{
            'recorded_at': data[0],
            'station': data[1],
            'water_level': float(data[2])
        } for data in history]
        
        df = pandas.DataFrame(history)
        df['recorded_at'] = pandas.to_datetime(df['recorded_at'])
        df = df.sort_values(by='recorded_at', ascending=True)
        
        river = pandas.DataFrame()
        for station in RIVER_CONSTANTS.keys():
            river[f"{station}_waterlevel"] = df[df['station'] == station]['water_level'].values
        
        # forecast river level
        river_level = self.model.predict(weather.values, river.values)
        river_level = pandas.DataFrame(river_level, columns=RIVER_CONSTANTS.keys())
        # add timestamps
        timestamp = datetime.now(timezone(timedelta(hours=8)))
        river_level.index = [(timestamp + timedelta(days=i)).isoformat() for i in range(7)]
        
        forecast = []
        for index, row in river_level.iterrows():
            for column, value in row.items():
                forecast.append({
                    'forecast_at': index,
                    'station': column,
                    'water_level': (float(value) + RIVER_CONSTANTS[column]) / 2
                })
            
        query = f"""
            INSERT INTO public.river_forecast (water_level, forecast_at, station)
            VALUES {', '.join([f"({data['water_level']}, '{data['forecast_at']}', '{data['station']}')" for data in forecast])}
        """
        self.cur.execute(query)
        self.conn.commit()
