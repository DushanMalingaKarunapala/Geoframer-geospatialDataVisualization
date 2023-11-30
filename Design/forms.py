from django import forms
from .models import *
from django.contrib.gis.geos import Point
from django.contrib.gis.geos import GEOSException
from django.forms import formset_factory


class TemperatureMapForm(forms.ModelForm):
    avgtem = forms.FloatField(label="Temperature", widget=forms.NumberInput(
        attrs={'class': 'form-control', 'placeholder': 'Input temperature', }))
    maxtem = forms.FloatField(label="Max Temperature", widget=forms.NumberInput(
        attrs={'class': 'form-control', 'placeholder': 'Input Max temperature'}))
    mintem = forms.FloatField(label="Min Temperature", widget=forms.NumberInput(
        attrs={'class': 'form-control', 'placeholder': 'Input Min temperature'}))
    date = forms.DateField(label="Date", widget=forms.DateInput(
        attrs={'class': 'form-control', 'placeholder': 'Input Date'}))
    latlongTemp = forms.CharField(label="Location", widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Input the location'}))
    # Add other fields and validations as needed

    class Meta:
        model = TemperatureMap
        exclude = ['temId', 'climateId']


class HumidityMapForm(forms.ModelForm):
    humidity = forms.FloatField(label="Humidity", widget=forms.NumberInput(
        attrs={'class': 'form-control', 'placeholder': 'Input humidity'}))
    latlongHum = forms.CharField(label="Location", widget=forms.NumberInput(
        attrs={'class': 'form-control', 'placeholder': 'Input location'}))
    date = forms.DateField(label="Date", widget=forms.DateInput(
        attrs={'class': 'form-control', 'placeholder': 'Input Date'}))
    # Add other fields and validations as needed

    class Meta:
        model = HumidityMap
        exclude = ['humId', 'climateId']


class PrecipitationForm(forms.ModelForm):
    climateId = forms.ModelChoiceField(
        queryset=ClimateData.objects.all(), required=False, empty_label='Create New Map')
    precipitation = forms.FloatField(label="Precipitation", widget=forms.NumberInput(
        attrs={'class': 'form-control', 'placeholder': 'Input precipitation'}))
    latlongPrecip = forms.CharField(label="Location", widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'ex: 7.334137,80.870260'}))
    date = forms.DateField(label="Date", widget=forms.DateInput(
        attrs={'class': 'form-control', 'placeholder': 'ex: 2024-05-09'}))
    # Add other fields and validations as needed

    def clean(self):
        cleaned_data = super().clean()
        lat_long_Precip = cleaned_data.get('latlongPrecip')
        if lat_long_Precip:
            try:
                lat, lon = map(float, lat_long_Precip.split(','))
                point = Point(lon, lat)
                cleaned_data['latlongPrecip'] = point
            except (ValueError, TypeError):
                self.add_error('latlongPrecip', 'Invalid location format.')
        return cleaned_data

    class Meta:
        model = Precipitation
        exclude = ['precipId', 'climateId']


class EarthquakesForm(forms.ModelForm):
    geodataid = forms.ModelChoiceField(queryset=Geological_Data.objects.all(
    ), required=False, empty_label='Create New Map')
    dateTime = forms.DateTimeField(label="Date and time", widget=forms.DateInput(
        attrs={'class': 'form-control', 'placeholder': 'ex: 2023-03-07 16:00'}), input_formats=['%Y-%m-%d %H:%M:%S']
    )
    epiLatLong = forms.CharField(label="Location", widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'ex: 7.334137,80.870260'}))
    magnitude = forms.FloatField(label="magnitude", widget=forms.NumberInput(
        attrs={'class': 'form-control', 'placeholder': 'ex: 3.0'}))
    depth = forms.FloatField(label="Depth", widget=forms.NumberInput(
        attrs={'class': 'form-control', 'placeholder': 'ex: 25'}))

    def clean(self):
        cleaned_data = super().clean()
        epi_lat_long = cleaned_data.get('epiLatLong')
        if epi_lat_long:
            try:
                lat, lon = map(float, epi_lat_long.split(','))
                point = Point(lon, lat)
                cleaned_data['epiLatLong'] = point
            except (ValueError, TypeError):
                self.add_error('epiLatLong', 'Invalid location format.')
        return cleaned_data

    class Meta:
        model = Earthquakes
        # exclude =("earthquakeid","geodataid") #excluding attributes
        fields = ['geodataid', 'dateTime', 'epiLatLong', 'magnitude', 'depth']


EarthquakesFormSet = formset_factory(EarthquakesForm, extra=1)


class SoilTypeForm(forms.ModelForm):

    soilLatLong = forms.CharField(label="Location", widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Input the location'}))
    soil_depth = forms.FloatField(label="Soil Depth", widget=forms.NumberInput(
        attrs={'class': 'form-control', 'placeholder': 'Input soil depth'}))

    soil_type = forms.CharField(label="Soil Type", widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Input soil type'}))
    # Add other fields and validations as needed

    class Meta:
        model = soilType
        exclude = ['soiltypeid', 'geodataid']


class MineralContentForm(forms.ModelForm):
    mineral_content = forms.CharField(label="Mineral Content", widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Input mineral content'}))
    # Add other fields and validations as needed

    class Meta:
        model = mineralContent
        exclude = ['minctid', 'geodataid']


class RocksForm(forms.ModelForm):
    rock_type = forms.CharField(label="Rock Type", widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Input rock type'}))
    # Add other fields and validations as needed

    class Meta:
        model = Rocks
        exclude = ['rockid', 'geodataid']


class WaterBodiesForm(forms.ModelForm):
    hydrodataid = forms.ModelChoiceField(
        queryset=HydroData.objects.all(), required=False, empty_label='Select HydroData')
    geometry = forms.CharField(label="Geometry", widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Input polygon coordinates'}))
    typeofwaterbody = forms.CharField(label="Type of Water Body", widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Input type of water body'}))
    area = forms.FloatField(label="Area", widget=forms.NumberInput(
        attrs={'class': 'form-control', 'placeholder': 'Input area'}))
    max_volume = forms.FloatField(label="Max Volume", widget=forms.NumberInput(
        attrs={'class': 'form-control', 'placeholder': 'Input max volume'}))

    def clean(self):
        cleaned_data = super().clean()
        geometry = cleaned_data.get('geometry')
        if geometry:
            try:
                # Convert the input coordinates to a Polygon
                polygon = GEOSGeometry(f'POLYGON(({geometry}))')
                cleaned_data['geometry'] = polygon
            except Exception as e:
                self.add_error(
                    'geometry', f'Invalid geometry format. Error: {str(e)}')

        return cleaned_data

    class Meta:
        model = WaterBodies
        fields = ['hydrodataid', 'geometry',
                  'typeofwaterbody', 'area', 'max_volume']
