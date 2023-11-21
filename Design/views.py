from django.shortcuts import render, redirect
from .models import ClimateData, Geological_Data, Earthquakes, Maps, User, TemperatureMap, HumidityMap, Precipitation
from django.contrib.sessions.models import Session
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import keplergl
from django.http import HttpResponse
from .forms import EarthquakesForm, TemperatureMapForm, SoilTypeForm, HumidityMapForm, PrecipitationForm
from django.contrib.gis.geos import Point
import logging
from django.utils import timezone
from django.contrib.gis.geos import GEOSGeometry
from django.contrib import messages
from keplergl import KeplerGl
from django.core.serializers import serialize
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import EarthquakeSerializer, PrecipitationSerializer, CommonDataSerializer
from rest_framework import generics
logger = logging.getLogger(__name__)


def is_ajax(request):
    return request.META.get('HTTP_CONTENT_TYPE') == 'application/json'


def Deshome(request):
    soil_type_form = SoilTypeForm()
    earthquakes_form = EarthquakesForm()
    humidity = HumidityMapForm()
    temperature_map_form = TemperatureMapForm()
    precipitation_form = PrecipitationForm()
    context = {'EarthquakesForm': earthquakes_form, 'TemperatureMapForm': temperature_map_form, 'SoilTypeForm': soil_type_form,
               'HumidityMapForm': humidity, 'PrecipitationForm': precipitation_form}
    return render(request, "Deshome.html", context)


def convert_to_geojson(data):
    features = []

    for entry in data:
        # Extract the relevant fields from the Earthquakes model
        properties = {

            "magnitude": entry.magnitude,
            "depth": entry.depth
        }

        # Extract the latitude and longitude from the epiLatLong field
        epi_lat_long = entry.epiLatLong  # Assuming it's a POINT type
        longitude = epi_lat_long.x
        latitude = epi_lat_long.y

        # Create a GeoJSON feature
        feature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                # Note the order is [longitude, latitude]
                "coordinates": [longitude, latitude]
            },
            "properties": properties
        }

        features.append(feature)

    # Create a GeoJSON FeatureCollection
    geojson = {
        "type": "FeatureCollection",
        "features": features
    }

    return json.dumps(geojson)


@csrf_exempt
def create_map(request):

    if request.method == 'POST':
        epi_lat_long = request.POST.get('epiLatLong')
        print(epi_lat_long)

        entered_magnitude = request.POST.get('magnitude')
        print(entered_magnitude)
        sub_map_type = request.POST.get('subMapType')
        print(sub_map_type)
        map_type = request.POST.get('mapType')
        print(map_type)
        data_source = request.POST.get('dataSource')
        print(data_source)
        dateTime = request.POST.get('dateTime')
        print(dateTime)
        depth = request.POST.get('depth')
        print(depth)
        if map_type == 'Geological_Data' and sub_map_type == 'Earthquakes' and data_source == 'newData':

            user = request.user
            form = EarthquakesForm(request.POST)

            latitude, longitude = request.POST.get('epiLatLong').split(',')
            point = Point(float(longitude), float(latitude))
            point_wkt = point.wkt
            epi_lat_long = point_wkt

            # form.instance.geodataid = geodata  #  # Assign the geodataid to the form instance
            if form.is_valid():

                if form.cleaned_data['geodataid']:
                    # User selected an existing geodataid
                    geodata = form.cleaned_data['geodataid']
                    maps = geodata.mapid

                    earthquakes = Earthquakes.objects.create(
                        geodataid=geodata,
                        dateTime=dateTime,
                        epiLatLong=epi_lat_long,
                        magnitude=entered_magnitude,
                        depth=depth
                    )

                    geodata.save()  # Save the geological_data object
                    maps.save()

                    data = Earthquakes.objects.all()  # Fetch the data from the database
                    # Convert the data to GeoJSON format
                    geojson_data = convert_to_geojson(data)

                    messages.success(
                        request, "Data added successfully. Do you want to visualize the map?")
                    return render(request, "Deshome.html")
                else:
                    # User chose to create a new map object
                    user = request.user
                    maps = Maps.objects.create(
                        id=user, type="geological_data", created_at=timezone.now(), updated_at=timezone.now())
                    geodata = Geological_Data.objects.create(
                        mapid=maps, geomapType='Earthquakes')

                    form.instance.geodataid = geodata

                    # Create the Earthquakes object

                    earthquakes = Earthquakes.objects.create(
                        geodataid=geodata,
                        dateTime=dateTime,
                        epiLatLong=epi_lat_long,
                        magnitude=entered_magnitude,
                        depth=depth
                    )

                    geodata.save()
                    maps.save()
                    messages.success(
                        request, "Data added successfully. Do you want to visualize the map?")

                    context = {
                        'success_message': messages.get_messages(request),

                    }
                    return render(request, "Deshome.html", context)
            else:
                logger.error(form.errors.as_data())

                form_errors = form.errors.get_json_data(escape_html=True)
                # Handle form submission
                return JsonResponse({'errors': form_errors}, status=400)

        elif map_type == 'ClimateData' and sub_map_type == "Precipitation" and data_source == 'newData':
            entered_precepitation = request.POST.get('precipitation')
            print(entered_precepitation)
            entered_date = request.POST.get('date')
            print(entered_date)
            user = request.user
            form = PrecipitationForm(request.POST)

            latitude, longitude = request.POST.get('latlongPrecip').split(',')
            point = Point(float(longitude), float(latitude))
            point_wkt = point.wkt
            lat_long_Precip = point_wkt

            if form.is_valid():

                if form.cleaned_data['climateId']:
                    # User selected an existing climatedataid
                    climatedata = form.cleaned_data['climateId']
                    maps = climatedata.mapid

                    precipitation = Precipitation.objects.create(
                        precipitation=entered_precepitation,
                        climateId=climatedata,
                        latlongPrecip=lat_long_Precip,
                        date=entered_date
                    )

                    climatedata.save()  # Save the climatedata object
                    maps.save()

                    messages.success(
                        request, "Data added successfully. Do you want to visualize the map?")
                    return render(request, "Deshome.html")

                else:
                    # User chose to create a new climate map object
                    user = request.user
                    maps = Maps.objects.create(
                        id=user, type="climatedata", created_at=timezone.now(), updated_at=timezone.now())
                    climatedata = ClimateData.objects.create(
                        mapid=maps, climatMapType='Precipitation')

                    form.instance.climateiId = climatedata

                    # Create the Precipitation object

                    precipitation = Precipitation.objects.create(
                        precipitation=entered_precepitation,
                        climateId=climatedata,
                        latlongPrecip=lat_long_Precip,
                        date=entered_date
                    )

                    climatedata.save()
                    maps.save()

                    messages.success(
                        request, "Data added successfully. Do you want to visualize the map?")
                    return render(request, "Deshome.html")

            else:
                logger.error(form.errors.as_data())

                form_errors = form.errors.get_json_data(escape_html=True)
                # Handle form submission
                return JsonResponse({'errors': form_errors}, status=400)

        else:
            return HttpResponse("Data is not valid")
        request_data = request.POST.get('requestData')
        print(request_data)

        # maps = Maps.objects.create(id=request.user, type=map_type)
        # maps.save()

        # geological_data = Geological_Data.objects.create(geomapType=sub_map_type)
        # geological_data.save()

        # earthquake = Earthquakes.objects.create(dateTime=entered_date_time, epiLatLong=location, magnitude=entered_magnitude, depth=entered_depth)
        # earthquake.save()

        # Create objects based on selected types
        if map_type == 'ClimateData':
            climate_data = ClimateData.objects.create(
                climatMapType=sub_map_type)
            # Create other related objects if needed
        elif map_type == 'Geological_Data':
            geological_data = Geological_Data.objects.create(
                geomapType=sub_map_type)
            # Create other related objects if needed

        # Redirect or show success message
        return JsonResponse({'message': 'Data received and processed successfully.'})
    else:
        return render(request, "Deshome.html")

# def map_created(request):
#     # Handle map creation success
#     return render(request, "map_created.html")

# def create_map(request):
#     # Handle create_map logic here
#     return render(request, 'create_map.html')


def fetch_climate_data_types(request):
    # Retrieve climate data types from your data source
    climate_data_types = ['Temperature', 'Precipitation', 'Humidity']

    # Create a JSON response with the data types
    response_data = {
        'types': climate_data_types
    }

    # Return the JSON response
    return JsonResponse(response_data)


def fetch_geological_data_types(request):
    # Retrieve geological data types from your data source
    geological_data_types = ['Rocks', 'Earthquakes', 'Soil Type']

    # Create a JSON response with the data types
    response_data = {
        'types': geological_data_types
    }

    # Return the JSON response
    return JsonResponse(response_data)


# @csrf_exempt
# def keplergl_map(request):
#     if request.method == 'POST':
#         answer = request.POST.get('answer')
#         if answer == 'yes':
#             data = Earthquakes.objects.all()  # Fetch the data from the database

#             # Convert the data to GeoJSON format
#             geojson_data = convert_to_geojson(data)
#             print("geojson data bro: " + geojson_data)
#             context = {
#                 'convertedtogeojson': geojson_data
#             }

#             return render(request, "keplergl_map.html")
#     else:
#         return render(request, "Deshome.html")


def get(request):
    if request.method == 'GET':
        # Use request.GET instead of request.POST
        submap_type = request.GET.get('subMapType')

        print("hukapu submaptype : ", submap_type)

        # You can process the submap_type as needed
        # For example, save it in session or return it in the response
        request.session['submap_type'] = submap_type
        return JsonResponse({'submap_type': submap_type})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)


class EarthquakesMapView(APIView):
    serializer_class = EarthquakeSerializer

    def get(self, request):

        submaptype = request.session.get('submap_type', '')# get the session id
        print('sub1', submaptype)

        if submaptype == "Earthquakes":

            try:
                # Fetch the data from the database
                data = Earthquakes.objects.all()

                # Serialize the data using the serializer_class
                serializer = self.serializer_class(data, many=True)
                egeojson_data = {
                    "type": "FeatureCollection",
                    "features": serializer.data
                }

                return Response({'egeojson_data': egeojson_data})

            except Exception as e:
                # Handle any exceptions and return an error response
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return HttpResponse("ane hukahan")

    def post(self, request):
        answer = request.POST.get('answer')
        sub_map_type = request.POST.get('sub_map_type')

        if answer == 'yes':
            if sub_map_type == 'Earthquakes':
                # Fetch Earthquakes GeoJSON data
                data = Earthquakes.objects.all()
                serializer = self.serializer_class(data, many=True)
                egeojson_data = {
                    "type": "FeatureCollection",
                    "features": serializer.data
                }
                return Response({'egeojson_data': egeojson_data})

            # Add more conditions for other sub-map types

            return render(request, 'keplergl_map.html')


class PrecipitationMapView(APIView):
    serializer_class = PrecipitationSerializer

    def get(self, request):

        submaptype = request.session.get('submap_type', '') # get the session id
        print('sub2', submaptype)

        if submaptype == "Precipitation":
            try:
                # Fetch the data from the database for Precipitation
                data = Precipitation.objects.all()

                # Serialize the data using the PrecipitationSerializer
                serializer = self.serializer_class(data, many=True)
                pgeojson_data = {
                    "type": "FeatureCollection",
                    "features": serializer.data
                }

                return Response({'pgeojson_data': pgeojson_data})

            except Exception as e:
                # Handle any exceptions and return an error response
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return HttpResponse('ane hukaan')

    def post(self, request):
        answer = request.POST.get('answer')
        sub_map_type = request.POST.get('sub_map_type')

        if answer == 'yes':
            if sub_map_type == 'Precipitation':
                # Fetch Precipitation GeoJSON data
                data = Precipitation.objects.all()
                serializer = self.serializer_class(data, many=True)
                pgeojson_data = {
                    "type": "FeatureCollection",
                    "features": serializer.data
                }
                return Response({'pgeojson_data': pgeojson_data})

            # Add more conditions for other sub-map types

            return render(request, 'keplergl_map.html')
