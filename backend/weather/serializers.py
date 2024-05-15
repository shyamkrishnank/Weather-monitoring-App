from rest_framework import serializers

from .models import *




class MoniteringRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonitoringRecord
        fields = '__all__'


class WeatherDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherData
        fields = '__all__'