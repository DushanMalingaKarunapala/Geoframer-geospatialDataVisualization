from rest_framework import serializers
from .models import Earthquakes, Precipitation

class EarthquakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Earthquakes
        fields = ('epiLatLong','magnitude','depth')

class PrecipitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Precipitation
        fields = ('latlongPrecip','precipitation','date')


class CommonDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = None  # The model will be set dynamically in the view
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        model = kwargs.pop('model', None)
        if model:
            self.Meta.model = model
        super(CommonDataSerializer, self).__init__(*args, **kwargs)