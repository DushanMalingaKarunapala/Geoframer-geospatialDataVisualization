from django import forms
from .models import TemperatureMap, HumidityMap, Precipitation, Earthquakes, soilType, mineralContent, Rocks,Geological_Data,ClimateData
from django.contrib.gis.geos import Point
from django.contrib.gis.geos import GEOSException


class TemperatureMapForm(forms.ModelForm):
    avgtem = forms.FloatField(label="Temperature", widget=forms.NumberInput(
        attrs={'class': 'form-control', 'placeholder': 'Input temperature',}))
    maxtem=forms.FloatField(label="Max Temperature",widget=forms.NumberInput(
        attrs={'class': 'form-control', 'placeholder': 'Input Max temperature'}))
    mintem=forms.FloatField(label="Min Temperature",widget=forms.NumberInput(
        attrs={'class': 'form-control', 'placeholder': 'Input Min temperature'}))
    date=forms.DateField(label="Date",widget=forms.DateInput(
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
    latlongHum= forms.CharField(label = "Location", widget=forms.NumberInput(
        attrs={'class': 'form-control', 'placeholder': 'Input location'}))    
    date=forms.DateField(label="Date",widget=forms.DateInput(
        attrs={'class': 'form-control', 'placeholder': 'Input Date'}))     
    # Add other fields and validations as needed

    class Meta:
        model = HumidityMap
        exclude = ['humId', 'climateId']


class PrecipitationForm(forms.ModelForm):
    climateId = forms.ModelChoiceField(queryset=ClimateData.objects.all(), required=False, empty_label='Create New Map')
    precipitation = forms.FloatField(label="Precipitation", widget=forms.NumberInput(
        attrs={'class': 'form-control', 'placeholder': 'Input precipitation'}))
    latlongPrecip = forms.CharField(label="Location", widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Input the location'}))
    date = forms.DateField(label="Date", widget=forms.DateInput(
        attrs={'class': 'form-control', 'placeholder': 'Input Date'}))        
    # Add other fields and validations as needed

    def clean(self):
        cleaned_data = super().clean()
        lat_long_Precip = cleaned_data.get('latlongPrecip')
        if lat_long_Precip :
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
    geodataid = forms.ModelChoiceField(queryset=Geological_Data.objects.all(), required=False, empty_label='Create New Map')
    dateTime = forms.DateTimeField(label="Date and time", widget=forms.DateInput(
        attrs={'class': 'form-control', 'placeholder': 'Date & Time'}),input_formats=['%Y-%m-%d %H:%M:%S'] 
    )
    epiLatLong = forms.CharField(label="Location", widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': 'Input the location'}))
    magnitude = forms.FloatField(label="magnitude", widget=forms.NumberInput(
        attrs={'class': 'form-control', 'placeholder': 'input magnitude'}))
    depth = forms.FloatField(label="Depth", widget=forms.NumberInput(
        attrs={'class': 'form-control', 'placeholder': 'input depth'}))


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
