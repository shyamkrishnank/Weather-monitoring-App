from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *

from .weatherApi import get_coordinates_data, get_weather_data


class GetMonitaringRecords(APIView):
    def get(self, request):
        user = request.user
        records = user.records.all()
        if records:
            serializer = MoniteringRecordSerializer(records, many=True)
            return Response({'message':'Success','records':serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'message':'Success','records':[]}, status=status.HTTP_200_OK)


c

