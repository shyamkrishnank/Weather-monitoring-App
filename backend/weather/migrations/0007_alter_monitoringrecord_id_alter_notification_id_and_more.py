# Generated by Django 5.0.6 on 2024-05-15 11:09

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('weather', '0006_notification_report'),
    ]

    operations = [
        migrations.AlterField(
            model_name='monitoringrecord',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='notification',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='weatherdata',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False),
        ),
    ]