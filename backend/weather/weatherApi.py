# views.py
import requests
from django.conf import settings
from django.http import JsonResponse

def get_coordinates_data():
    city_name = 'London'
    state_code = ''
    country_code = 'UK'
    limit = 1  # You can adjust this as needed

    api_key = '2d0e5255a9e0d487175a01d05261ef0c'
    url = f"http://api.openweathermap.org/geo/1.0/zip?zip=E14,GB&appid={api_key}"

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
