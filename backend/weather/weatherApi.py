# views.py
import requests
from django.conf import settings
from django.http import JsonResponse

def get_coordinates_data(state_code,country_code):
    api_key = settings.WEATHER_API_KEY
    url = f"http://api.openweathermap.org/geo/1.0/zip?zip={state_code},{country_code}&appid={api_key}"

    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        return data
    else:
        return 'Error Occured'


def get_weather_data(lat,lon):
    api_key = '2d0e5255a9e0d487175a01d05261ef0c'
    url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}'
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        return data
    else:
        return 'Error Occured'
