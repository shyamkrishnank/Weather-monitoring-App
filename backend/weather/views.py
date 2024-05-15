from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .tasks import Search_Recorded_Data

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


class AddMonitaringRecords(APIView):
    def post(self, request):
        data = request.data
        data['user'] = request.user.id
        serializer = MoniteringRecordSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Record Added Succesfully','record':serializer.data}, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response({'message':'Something Went Wrong'}, status=status.HTTP_400_BAD_REQUEST)


# class GetWeatherReport(APIView):
#     def get(self, request):
#         Search_Recorded_Data()
#         return Response({'kdkd':'djdjd'})



