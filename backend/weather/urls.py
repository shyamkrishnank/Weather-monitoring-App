from django.urls import path
from .views import *

urlpatterns = [
    path('getrecords/', GetMonitaringRecords.as_view()),


]
