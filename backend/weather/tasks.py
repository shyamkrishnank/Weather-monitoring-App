from celery import shared_task
from .models import MonitoringRecord
from .weatherApi import get_weather_data
from .models import WeatherData, Notification
from .serializers import WeatherDataSerializer
@shared_task(bind=True)
def Search_Recorded_Data(self):
    records = MonitoringRecord.objects.filter(status='Active')
    for record in records:
        lon = record.user.location.lon
        lat = record.user.location.lat
        weather_report = WeatherData.objects.filter(lon = lon, lat = lat).first()
        if weather_report:
            pass
        else:
            report = get_weather_data(lat,lon)
            weather_report = WeatherData(temp = report['main']['temp'],
                                         pressure = report['main']['pressure'],
                                         humidity = report['main']['humidity'],
                                         lon = lon,
                                         lat = lat,
                                         )
            weather_report.save()

        if record.criterion == 'temperature':
            weather_value = weather_report.temp
        elif record.criterion == 'humidity':
            weather_value = weather_report.humidity
        elif record.criterion == 'pressure':
            weather_value = weather_report.pressure

        if eval(f"{weather_value} {record.comparison_operator} {record.value}"):
            notification = Notification(
                user = record.user,
                message = 'Today the weather satisfies one of your report',
                report = record
            )
            notification.save()
            record.status = "Completed"
            record.save()
    return True



