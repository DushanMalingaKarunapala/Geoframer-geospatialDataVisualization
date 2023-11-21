from django.db import models

from django.db import models

class MapType(models.Model):
    name = models.CharField(max_length=100)

class DataType(models.Model):
    name = models.CharField(max_length=100)

class Map(models.Model):
    title = models.CharField(max_length=255)
    map_type = models.ForeignKey(MapType, on_delete=models.CASCADE)
    data_type = models.ForeignKey(DataType, on_delete=models.CASCADE)
    map_file = models.FileField(upload_to='media/maps/')  # This field will store the uploaded map file
    thumbnail = models.ImageField(upload_to='media/thumbnails/', null=True, blank=True)  # This field is for the image thumbnail
    free = models.BooleanField(default=True)
