import os
import dotenv
import requests
import psycopg2
import datetime

# load environment variables
dotenv.load_dotenv()

# pipeline configurations
DATABASE_HOST = os.getenv("DATABASE_HOST")
DATABASE_USER = os.getenv("DATABASE_USER")
DATABASE_NAME = os.getenv("DATABASE_NAME")
DATABASE_PASS = os.getenv("DATABASE_PASS")

WEATHER_KEY_1 = os.getenv("WEATHER_KEY_1")
WEATHER_KEY_2 = os.getenv("WEATHER_KEY_2")
WEATHER_STATIONS = {
    'Nangka': [14.67380015487957, 121.10952223297156],
    'Tumana': [14.65663836666501, 121.09607188249578],
    'Manalo': [14.636024333867782, 121.09322641787077],
    'Marcos': [14.626562059631189, 121.08221630844051],
    'Rosario': [14.590231696552385, 121.0829338500222],
    'Wawa': [14.728567715052451, 121.19183804554964]
}

RIVER_STATIONS = {
    'Nangka': 'Nangka',
    'Sto Nino': 'Sto_Nino',
    'Marcos Highway': 'Marcos',
    'Tumana Bridge': 'Tumana',
    'Rosario Bridge': 'Rosario',
    'Manalo Bridge': 'Manalo',
    'San Mateo-1': 'San_Mateo',
    'Rodriguez': 'Rodriguez'
}
RIVER_CONSTANTS = {
    'Nangka': 15.93,
    'Sto_Nino': 12.20,
    'Marcos': 12.30,
    'Tumana': 12.18,
    'Rosario': 11.00,
    'Manalo': 12.00,
    'San_Mateo': 15.91,
    'Rodriguez': 21.30
}

class Pipeline:
    def __init__(self):
        # load database
        self.conn = psycopg2.connect(
            host=DATABASE_HOST,
            database=DATABASE_NAME,
            user=DATABASE_USER,
            password=DATABASE_PASS
        )
        self.cur = self.conn.cursor()
        
    def update(self):
        timestamp = datetime.datetime.now().isoformat()
        # collect river data
        response = requests.get('https://pasig-marikina-tullahanffws.pagasa.dost.gov.ph/water/main_list.do')
        response = response.json()
        
        # filter and clean data (replace normal river level if null)
        river_data = { RIVER_STATIONS[data['obsnm']]: {
                'water_level': float(data['wl'].replace('(*)', '')) if float(data['wl'].replace('(*)', '')) > 0 else RIVER_CONSTANTS[RIVER_STATIONS[data['obsnm']]],
                'recorded_at': timestamp
            } for data in response if data['obsnm'] in RIVER_STATIONS.keys() 
        }
        
        # save river data in database
        query = f"""
            INSERT INTO public.river_history (station, water_level, recorded_at)
            VALUES {', '.join([f"('{key}', {data['water_level']}, '{data['recorded_at']}')" 
            for key, data in river_data.items()])}
        """
        self.cur.execute(query)
        self.conn.commit()
        
        # collect weather data
        weather_data = {}
        for station, coordinates in WEATHER_STATIONS.items():
            lat, lon = coordinates
            response = requests.get(f"https://api.weatherbit.io/v2.0/current?lat={lat}&lon={lon}&key={WEATHER_KEY_1 if datetime.datetime.now().hour <= 12 else WEATHER_KEY_2}")
            response = response.json()
            response = response['data'][0]
            
            weather_data[station] = {
                'temperature': float(response['temp']),
                'humidity': float(response['rh']),
                'wind_speed': float(response['wind_spd']),
                'precipitation': float(response['precip']),
                'recorded_at': timestamp
            }
            
        # save weather data in database
        query = f"""
            INSERT INTO public.weather_history (station, temperature, humidity, wind_speed, precipitation, recorded_at)
            VALUES {', '.join([f"('{key}', {data['temperature']}, {data['humidity']}, {data['wind_speed']}, {data['precipitation']}, '{data['recorded_at']}')" 
            for key, data in weather_data.items()])}
        """
        self.cur.execute(query)
        self.conn.commit()
