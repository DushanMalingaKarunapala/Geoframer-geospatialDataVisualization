from django.db import models
from django.contrib.auth.models import User
from django.db import models


class MapType(models.Model):
    name = models.CharField(max_length=100)


class DataType(models.Model):
    name = models.CharField(max_length=100)


class Map(models.Model):
    title = models.CharField(max_length=255)
    map_type = models.ForeignKey(MapType, on_delete=models.CASCADE)
    data_type = models.ForeignKey(DataType, on_delete=models.CASCADE)
    # This field will store the uploaded map file
    map_file = models.FileField(upload_to='media/maps/')
    # This field is for the image thumbnail
    thumbnail = models.ImageField(
        upload_to='media/thumbnails/', null=True, blank=True)
    free = models.BooleanField(default=True)
    price = models.DecimalField(
        max_digits=8, decimal_places=2, null=True, blank=True)

    def save(self, *args, **kwargs):
        # Ensure that if the map is marked as free, the price is set to None
        if self.free:
            self.price = None
        super(Map, self).save(*args, **kwargs)


# payment model
