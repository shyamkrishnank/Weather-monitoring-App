from rest_framework import serializers

from .models import *




class MoniteringRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonitoringRecord
        fields = '__all__'