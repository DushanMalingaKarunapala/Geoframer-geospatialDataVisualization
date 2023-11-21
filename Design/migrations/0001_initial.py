# Generated by Django 4.2 on 2023-06-11 17:58

from django.conf import settings
import django.contrib.gis.db.models.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ClimateData',
            fields=[
                ('climateId', models.CharField(primary_key=True, serialize=False)),
                ('climatMapType', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Geological_Data',
            fields=[
                ('geodataid', models.CharField(primary_key=True, serialize=False)),
                ('geomapType', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='TemperatureMap',
            fields=[
                ('temId', models.CharField(primary_key=True, serialize=False)),
                ('avgtem', models.FloatField()),
                ('maxtem', models.FloatField()),
                ('mintem', models.FloatField()),
                ('date', models.DateField()),
                ('latlongTemp', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('climateId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Design.climatedata')),
            ],
        ),
        migrations.CreateModel(
            name='soilType',
            fields=[
                ('soiltypeid', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('soilLatLong', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('soildepth', models.FloatField()),
                ('soiltype', models.CharField(max_length=100)),
                ('geodataid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Design.geological_data')),
            ],
        ),
        migrations.CreateModel(
            name='Rocks',
            fields=[
                ('rockid', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('rockLatLong', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('rocktype', models.CharField(max_length=100)),
                ('rockage', models.FloatField()),
                ('geodataid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Design.geological_data')),
            ],
        ),
        migrations.CreateModel(
            name='Precipitation',
            fields=[
                ('precipId', models.CharField(primary_key=True, serialize=False)),
                ('precipitation', models.FloatField()),
                ('latlongPrecip', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('date', models.DateField()),
                ('climateId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Design.climatedata')),
            ],
        ),
        migrations.CreateModel(
            name='mineralContent',
            fields=[
                ('minctid', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('minctLatLong', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('mintype', models.CharField(max_length=100)),
                ('minpercentage', models.FloatField()),
                ('geodataid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Design.geological_data')),
            ],
        ),
        migrations.CreateModel(
            name='Maps',
            fields=[
                ('mapid', models.CharField(primary_key=True, serialize=False)),
                ('type', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField()),
                ('updated_at', models.DateTimeField()),
                ('id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='HumidityMap',
            fields=[
                ('humId', models.CharField(primary_key=True, serialize=False)),
                ('humidity', models.IntegerField()),
                ('latlongHum', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('date', models.DateField()),
                ('climateId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Design.climatedata')),
            ],
        ),
        migrations.AddField(
            model_name='geological_data',
            name='mapid',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Design.maps'),
        ),
        migrations.CreateModel(
            name='Earthquakes',
            fields=[
                ('earthquakeid', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('dateTime', models.DateTimeField()),
                ('epiLatLong', django.contrib.gis.db.models.fields.PointField(srid=4326)),
                ('magnitude', models.FloatField()),
                ('depth', models.FloatField()),
                ('geodataid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='earthquakes', to='Design.geological_data')),
            ],
        ),
        migrations.AddField(
            model_name='climatedata',
            name='mapid',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Design.maps'),
        ),
    ]
