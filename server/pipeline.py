import os
import dotenv
import requests
import psycopg2

from datetime import datetime, timezone, timedelta

# load environment variables
dotenv.load_dotenv()

# pipeline configurations
WEATHER_KEY = os.getenv("WEATHER_KEY")
DATABASE_HOST = os.getenv("DATABASE_HOST")
DATABASE_USER = os.getenv("DATABASE_USER")
DATABASE_NAME = os.getenv("DATABASE_NAME")
DATABASE_PASS = os.getenv("DATABASE_PASS")

WEATHER_STATIONS = {
    'Nangka': [14.67380015487957, 121.10952223297156],
    'Tumana': [14.65663836666501, 121.09607188249578],
    'Manalo': [14.636024333867782, 121.09322641787077],
    'Marcos': [14.626562059631189, 121.08221630844051],
    'Rosario': [14.590231696552385, 121.0829338500222],
    'Wawa': [14.728567715052451, 121.19183804554964]
}

RAINFALL_STATIONS = {
    'Nangka': 'San Mateo-2',
    'Tumana': 'Nangka',
    'Manalo': 'Marikina (Youth Camp)',
    'Marcos': 'Marikina (Youth Camp)',
    'Rosario': 'Napindan',
    'Wawa': 'Sitio Wawa'
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
    
    def _parse_rainfall(self, rainfall: str):
        try:
            return float(rainfall.replace('(*)', ''))
        except ValueError:
            return 0.0
    
    def _parse_river_level(self, station: str, level: str):
        try:
            level = float(level.replace('(*)', ''))
            
            if level > 0:
                return level
            return RIVER_CONSTANTS[RIVER_STATIONS[station]]
        except ValueError:
            return RIVER_CONSTANTS[RIVER_STATIONS[station]]
        
    def update(self):
        timestamp = datetime.now(timezone(timedelta(hours=8))).isoformat()
        # collect river data
        response = requests.get('https://pasig-marikina-tullahanffws.pagasa.dost.gov.ph/water/main_list.do')
        response = response.json()
        
        # filter and clean data (replace normal river level if null)
        river_data = { RIVER_STATIONS[data['obsnm']]: {
                'water_level': self._parse_river_level(data['obsnm'], data['wl']),
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
        
        # collect rainfall data
        response = requests.get('https://pasig-marikina-tullahanffws.pagasa.dost.gov.ph/rainfall/main_list.do')
        response = response.json()
        
        rainfall_data = { data['obsnm']: self._parse_rainfall(data['rf']) for data in response if data['obsnm'] in RAINFALL_STATIONS.values() }
        
        # collect other weather data
        weather_data = {}
        for station, coordinates in WEATHER_STATIONS.items():
            lat, lon = coordinates
            response = requests.get(f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={WEATHER_KEY}")
            response = response.json()
            
            weather_data[station] = {
                'temperature': float(response['main']['temp']),
                'humidity': float(response['main']['humidity']),
                'wind_speed': float(response['wind']['speed']),
                'precipitation': float(rainfall_data[RAINFALL_STATIONS[station]]),
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
