from django.db import models
from authApp.models import CustomUser

class MonitoringRecord(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='records')
    CRITERION_CHOICES = [
        ('Temperature', 'Temperature'),
        ('Humidity', 'Humidity'),
        ('Pressure', 'Pressure')
    ]
    OPERATOR_CHOICES = [
        ('<', '<'),
        ('>', '>'),
        ('<=', '<='),
        ('>=', '>='),
        ('==', '==')
    ]
    FREQUENCY_CHOICES = [
        ('Daily','Daily'),
        ('Monthly','Monthly'),
        ('Yearly', 'Yearly')
    ]
    criterion = models.CharField(max_length=20, choices=CRITERION_CHOICES)
    comparison_operator = models.CharField(max_length=2, choices=OPERATOR_CHOICES)
    value = models.FloatField()
    frequency = models.CharField(max_length=20, choices=FREQUENCY_CHOICES)
    status = models.CharField(max_length=20, default='Active')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class WeatherData(models.Model):
    temperature = models.FloatField()
    humidity = models.FloatField()
    pressure = models.FloatField()
    fetched_at = models.DateTimeField(auto_now=True)


class Notification(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='notification')
    message = models.TextField()
    status = models.CharField(max_length=30, default='Not Seen')

    def __str__(self):
        return f"Notification to {self.user.username} at {self.sent_at}"