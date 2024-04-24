import os
import json
import dotenv
import psycopg2

from pywebpush import webpush

# load environment variables
dotenv.load_dotenv()

DATABASE_HOST = os.getenv("DATABASE_HOST")
DATABASE_USER = os.getenv("DATABASE_USER")
DATABASE_NAME = os.getenv("DATABASE_NAME")
DATABASE_PASS = os.getenv("DATABASE_PASS")

PUBLIC_VAPID_KEY = os.getenv("PUBLIC_VAPID_KEY")
PRIVATE_VAPID_KEY = os.getenv("PRIVATE_VAPID_KEY")

ALERT = {
    'Nangka': 15.93,
    'Sto_Nino': 12.20,
    'Marcos': 12.30,
    'Tumana': 12.18,
    'Rosario': 11.00,
    'Manalo': 12.00,
    'San_Mateo': 15.91,
    'Rodriguez': 21.30
}

ALARM = {
    'Nangka': 15.93,
    'Sto_Nino': 12.20,
    'Marcos': 12.30,
    'Tumana': 12.18,
    'Rosario': 11.00,
    'Manalo': 12.00,
    'San_Mateo': 15.91,
    'Rodriguez': 21.30
}

CRITICAL = {
    'Nangka': 15.93,
    'Sto_Nino': 12.20,
    'Marcos': 12.30,
    'Tumana': 12.18,
    'Rosario': 11.00,
    'Manalo': 12.00,
    'San_Mateo': 15.91,
    'Rodriguez': 21.30
}

CRITICAL = {
    'Nangka': 15.93,
    'Sto_Nino': 12.20,
    'Marcos': 12.30,
    'Tumana': 12.18,
    'Rosario': 11.00,
    'Manalo': 12.00,
    'San_Mateo': 15.91,
    'Rodriguez': 21.30
}

database = psycopg2.connect(
    host=DATABASE_HOST,
    database=DATABASE_NAME,
    user=DATABASE_USER,
    password=DATABASE_PASS
)
connection = database.cursor()


def save_subscription(subscription: str):
    query = f"""
        INSERT INTO public.subscriptions (device) VALUES ('{subscription}')
    """
    connection.execute(query)
    database.commit()

def remove_subscription(subscription: str):
    query = f"""
        DELETE FROM public.subscriptions WHERE device = '{subscription}'
    """
    connection.execute(query)
    database.commit()

def send_notifications(subject: str, message: str):
    payload = { 'title': subject, 'message': message }

    query = f"""
        SELECT device FROM public.subscriptions ORDER BY id ASC;
    """
    connection.execute(query)
    
    subscriptions = connection.fetchall()
    subscriptions = [subscription[0] for subscription in subscriptions]

    for subscription in subscriptions:
        webpush(
            json.loads(subscription), 
            json.dumps(payload), 
            vapid_private_key=PRIVATE_VAPID_KEY, 
            vapid_claims={ "sub": "https://rivercast.automos.net" })
