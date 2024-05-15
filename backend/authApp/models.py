import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)


class CurrentLocation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='location')
    city_name = models.CharField(max_length=200)
    state = models.CharField(max_length=200)
    pin_code = models.CharField(max_length=300)
    country = models.CharField(max_length=200)
    country_code = models.CharField(max_length=200)
    lon = models.FloatField(null=True)
    lat = models.FloatField(null=True)
