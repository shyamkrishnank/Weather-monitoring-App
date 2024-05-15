from django.urls import path
from .views import *

urlpatterns = [
    path('getrecords/', GetMonitaringRecords.as_view()),
    path('addrecords/', AddMonitaringRecords.as_view()),
    # path('getweather/', GetWeatherReport.as_view())


]
