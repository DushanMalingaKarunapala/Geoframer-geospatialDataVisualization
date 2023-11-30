from django.db import models
from django.contrib.auth.models import User
from django.contrib.gis.db import models


class Maps(models.Model):
    mapid = models.CharField(primary_key=True)
    id = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=100)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    def save(self, *args, **kwargs):
        if not self.mapid:
            last_id = Maps.objects.order_by('-mapid').first()
            if last_id:
                last_id_number = int(last_id.mapid[2:])
                new_id = 'mp' + str(last_id_number + 1)
            else:
                new_id = 'mp1'
            self.mapid = new_id
        super().save(*args, **kwargs)


class ClimateData(models.Model):
    climateId = models.CharField(primary_key=True)
    mapid = models.ForeignKey(Maps, on_delete=models.CASCADE)
    climatMapType = models.CharField(max_length=50)

    def save(self, *args, **kwargs):
        if not self.climateId:
            last_id = ClimateData.objects.order_by('-climateId').first()
            if last_id:
                last_id_number = int(last_id.climateId[4:])
                new_id = 'clmt' + str(last_id_number + 1)
            else:
                new_id = 'clmt1'
            self.climateId = new_id
        super().save(*args, **kwargs)


class TemperatureMap(models.Model):
    temId = models.CharField(primary_key=True)
    climateId = models.ForeignKey(ClimateData, on_delete=models.CASCADE)
    avgtem = models.FloatField()
    maxtem = models.FloatField()
    mintem = models.FloatField()
    date = models.DateField()
    latlongTemp = models.PointField()

    def save(self, *args, **kwargs):
        if not self.temId:
            last_id = TemperatureMap.objects.order_by('-temId').first()
            if last_id:
                last_id_number = int(last_id.temId[3:])
                new_id = 'tem' + str(last_id_number + 1)
            else:
                new_id = 'tem1'
            self.temId = new_id
        super().save(*args, **kwargs)


class HumidityMap(models.Model):
    humId = models.CharField(primary_key=True)
    climateId = models.ForeignKey(ClimateData, on_delete=models.CASCADE)
    humidity = models.IntegerField()
    latlongHum = models.PointField()
    date = models.DateField()

    def save(self, *args, **kwargs):
        if not self.humId:
            last_id = HumidityMap.objects.order_by('-humId').first()
            if last_id:
                last_id_number = int(last_id.humId[3:])
                new_id = 'hum' + str(last_id_number + 1)
            else:
                new_id = 'hum1'
            self.humId = new_id
        super().save(*args, **kwargs)


class Precipitation(models.Model):
    precipId = models.CharField(primary_key=True)
    climateId = models.ForeignKey(ClimateData, on_delete=models.CASCADE)
    precipitation = models.FloatField()
    latlongPrecip = models.PointField()
    date = models.DateField()

    def save(self, *args, **kwargs):
        if not self.precipId:
            last_id = Precipitation.objects.order_by('-precipId').first()
            if last_id:
                last_id_number = int(last_id.precipId[4:])
                new_id = 'prec' + str(last_id_number + 1)
            else:
                new_id = 'prec1'
            self.precipId = new_id
        super().save(*args, **kwargs)


# geological map models
class Geological_Data(models.Model):
    geodataid = models.CharField(primary_key=True)
    mapid = models.ForeignKey(Maps, on_delete=models.CASCADE)
    geomapType = models.CharField(max_length=50)

    def save(self, *args, **kwargs):
        if not self.geodataid:
            last_id = Geological_Data.objects.order_by('-geodataid').first()
            if last_id:
                last_id_number = int(last_id.geodataid[5:])
                new_id = 'geomp' + str(last_id_number + 1)
            else:
                new_id = 'geomp1'
            self.geodataid = new_id
        super().save(*args, **kwargs)


class Earthquakes(models.Model):
    earthquakeid = models.CharField(max_length=10, primary_key=True,)
    geodataid = models.ForeignKey(
        Geological_Data, on_delete=models.CASCADE, related_name='earthquakes')
    dateTime = models.DateTimeField()
    epiLatLong = models.PointField()
    magnitude = models.FloatField()
    depth = models.FloatField()
    # To auto-generate model object IDs with a custom format

    def save(self, *args, **kwargs):
        if not self.earthquakeid:
            last_id = Earthquakes.objects.order_by('-earthquakeid').first()
            if last_id:
                last_id_number = int(last_id.earthquakeid[2:])
                new_id = 'eq' + str(last_id_number + 1)
            else:
                new_id = 'eq1'
            self.earthquakeid = new_id
        super().save(*args, **kwargs)


class soilType(models.Model):
    soiltypeid = models.CharField(max_length=10, primary_key=True)
    geodataid = models.ForeignKey(Geological_Data, on_delete=models.CASCADE)
    soilLatLong = models.PointField()
    soildepth = models.FloatField()
    soiltype = models.CharField(max_length=100)
    # To auto-generate model object IDs with a custom format

    def save(self, *args, **kwargs):
        if not self.soiltypeid:
            last_id = soilType.objects.order_by('-soiltypeid').first()
            if last_id:
                last_id_number = int(last_id.soiltypeid[2:])
                new_id = 'st' + str(last_id_number + 1)
            else:
                new_id = 'st1'
            self.soiltypeid = new_id
        super().save(*args, **kwargs)


class mineralContent(models.Model):
    minctid = models.CharField(max_length=10, primary_key=True)
    geodataid = models.ForeignKey(Geological_Data, on_delete=models.CASCADE)
    minctLatLong = models.PointField()
    mintype = models.CharField(max_length=100)
    minpercentage = models.FloatField()
    # To auto-generate model object IDs with a custom format

    def save(self, *args, **kwargs):
        if not self.minctid:
            last_id = mineralContent.objects.order_by('-minctid').first()
            if last_id:
                last_id_number = int(last_id.minctid[5:])
                new_id = 'minct' + str(last_id_number + 1)
            else:
                new_id = 'minct1'
            self.minctid = new_id
        super().save(*args, **kwargs)


class Rocks(models.Model):
    rockid = models.CharField(max_length=10, primary_key=True)
    geodataid = models.ForeignKey(Geological_Data, on_delete=models.CASCADE)
    rockLatLong = models.PointField()
    rocktype = models.CharField(max_length=100)
    rockage = models.FloatField()
    # To auto-generate model object IDs with a custom format

    def save(self, *args, **kwargs):
        if not self.rockid:
            last_id = Rocks.objects.order_by('-rockid').first()
            if last_id:
                last_id_number = int(last_id.rockid[4:])
                new_id = 'rock' + str(last_id_number + 1)
            else:
                new_id = 'rock1'
            self.rockid = new_id
        super().save(*args, **kwargs)


class HydroData(models.Model):
    hydrodataid = models.CharField(primary_key=True)
    mapid = models.ForeignKey(Maps, on_delete=models.CASCADE)
    hydromaptype = models.CharField(max_length=50)

    def save(self, *args, **kwargs):
        if not self.hydrodataid:
            last_id = HydroData.objects.order_by('-hydrodataid').first()
            if last_id:
                last_id_number = int(last_id.hydrodataid[5:])
                new_id = 'hydro' + str(last_id_number + 1)
            else:
                new_id = 'hydro1'
            self.hydrodataid = new_id
        super().save(*args, **kwargs)


class WaterBodies(models.Model):
    waterbodyid = models.CharField(max_length=10, primary_key=True)
    hydrodataid = models.ForeignKey(HydroData, on_delete=models.CASCADE)
    geometry = models.PolygonField(srid=4326, geography=True, null=False)
    typeofwaterbody = models.CharField(max_length=100)
    area = models.FloatField(null=True)
    max_volume = models.FloatField(null=True)
    city = models.CharField(null=True)

    def save(self, *args, **kwargs):
        if not self.waterbodyid:
            last_id = WaterBodies.objects.order_by('-waterbodyid').first()
            if last_id:
                last_id_number = int(last_id.waterbodyid[11:])
                new_id = 'waterbd' + str(last_id_number + 1)
            else:
                new_id = 'waterbd1'
            self.rockid = new_id
        super().save(*args, **kwargs)
