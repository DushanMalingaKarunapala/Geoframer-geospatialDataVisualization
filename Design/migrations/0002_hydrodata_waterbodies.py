# Generated by Django 4.2 on 2023-11-30 16:52

import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Design', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='HydroData',
            fields=[
                ('hydrodataid', models.CharField(primary_key=True, serialize=False)),
                ('hydromaptype', models.CharField(max_length=50)),
                ('mapid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Design.maps')),
            ],
        ),
        migrations.CreateModel(
            name='WaterBodies',
            fields=[
                ('waterbodyid', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('geometry', django.contrib.gis.db.models.fields.PolygonField(geography=True, srid=4326)),
                ('typeofwaterbody', models.CharField(max_length=100)),
                ('area', models.FloatField(null=True)),
                ('max_volume', models.FloatField(null=True)),
                ('city', models.CharField(null=True)),
                ('hydrodataid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Design.hydrodata')),
            ],
        ),
    ]
