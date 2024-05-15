# Generated by Django 5.0.6 on 2024-05-15 05:25

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authApp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CurrentLocation',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('city_name', models.CharField(max_length=200)),
                ('state', models.CharField(max_length=200)),
                ('state_code', models.CharField(max_length=300)),
                ('country', models.CharField(max_length=200)),
                ('country_code', models.CharField(max_length=200)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
