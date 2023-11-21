from django.test import TestCase, RequestFactory
from django.test import TestCase, Client
from django.test import SimpleTestCase
import json
from django.urls import reverse, resolve
from Design.views import Deshome, create_map, fetch_climate_data_types, fetch_geological_data_types, EarthquakesMapView
from Design.forms import EarthquakesForm, TemperatureMapForm, SoilTypeForm, HumidityMapForm, PrecipitationForm
from django.contrib.auth.models import User
from django.contrib.messages import get_messages
from rest_framework.test import APIRequestFactory
from rest_framework import status
from datetime import datetime, date
from Design.serializers import EarthquakeSerializer, PrecipitationSerializer
from Design.models import *
from Design.views import EarthquakesMapView, PrecipitationMapView
from django.contrib.gis.geos import Point


# testurls.


class TestUrls(SimpleTestCase):

    def test_generate_visualizationsHome_is_resolve(self):
        url = reverse('Deshome')
        print(resolve(url))
        self.assertEquals(resolve(url).func, Deshome)

    def test_create_map_is_resolve(self):
        url = reverse('create_map')
        print(resolve(url))
        self.assertEquals(resolve(url).func, create_map)

    def test_fetch_geological_data_types_is_resolve(self):
        url = reverse('fetch_geological_data_types')
        print(resolve(url))
        self.assertEquals(resolve(url).func, fetch_geological_data_types)

    def test_fetch_climate_data_types_is_resolve(self):
        url = reverse('fetch_climate_data_types')
        print(resolve(url))
        self.assertEquals(resolve(url).func, fetch_climate_data_types)


# test views

class DesignAppTestCase(TestCase):

    def setUp(self):
        self.factory = RequestFactory()
     # Create a test user
        self.user = User.objects.create_user(
            username='testuser', password='testpassword'
        )

    def test_deshome_view_get(self):
        url = reverse('Deshome')
        request = self.factory.get(url)
        response = Deshome(request)

        # expecting a successful response
        self.assertEqual(response.status_code, 200)

       

        self.assertContains(response, 'precipitationForm')
        self.assertContains(response, 'earthquakesForm')
        

    def test_create_map_post(self):
        # Log in the test user
        self.client.login(username='testuser', password='testpassword')

        # Define the URL view
        
        url = reverse('create_map')

        # Prepare POST data
        post_data = {
            'epiLatLong': '6.878437,80.252569',  # Sample latitude, longitude
            'magnitude': '5.0',  # Sample magnitude
            'subMapType': 'Earthquakes',
            'mapType': 'Geological_Data',
            'dataSource': 'newData',
            'dateTime': '2023-08-01 12:00:00',
            'depth': '10.0',
        }

        # Send a POST request to the view and follow redirects
        response = self.client.post(url, post_data, follow=True)

        #expecting a successful response
        self.assertEqual(response.status_code, 200)

        # Check if the success message is in the redirected page
        messages = list(get_messages(response.wsgi_request))
        self.assertTrue(messages)  # Check if there are any messages

        success_message = "Data added successfully. Do you want to visualize the map?"
        self.assertIn(success_message, [msg.message for msg in messages])

        # Log out the user after the test
        self.client.logout()

    def test_fetch_climate_data_types_get(self):
        url = '/fetch_climate_data_types/'
        response = self.client.get(url)

        # expecting a successful response
        self.assertEqual(response.status_code, 200)

        # Parse the JSON response
        data = json.loads(response.content)

        
        self.assertIn('types', data)
        self.assertEqual(data['types'], ['Temperature',
                         'Precipitation', 'Humidity'])

    def test_fetch_geological_data_types_get(self):
        url = '/fetch_geological_data_types/'
        response = self.client.get(url)

        #expecting a successful response
        self.assertEqual(response.status_code, 200)

        # Parse the JSON response
        data = json.loads(response.content)

        
        self.assertIn('types', data)
        self.assertEqual(data['types'], ['Rocks', 'Earthquakes', 'Soil Type'])


class EarthquakesMapViewIntegrationTest(TestCase):

    def setUp(self):
        # Set up the client
        self.client = Client()

        # Set up initial data for the tests
        self.test_data = {
            'epiLatLong': '7.668530,80.086758',
            'datetime': '2013-09-04 23:30:00+05:30',
            'depth': 22,
            'magnitude': 5
        }

    def test_earthquakes_map_view_get(self):
        # Simulate a GET request to the endpoint
        
        url = reverse('earthquakes_map')
        response = self.client.get(url)

        # Check that the response status code is as expected
        self.assertEqual(response.status_code, 200)

        # Check the content of the response
        data = json.loads(response.content)
        self.assertIn('egeojson_data', data)
        

    def test_earthquakes_map_view_post(self):
        # Simulate a POST request to the endpoint
        
        url = reverse('earthquakes_map')
        data = {'answer': 'yes', 'sub_map_type': 'Earthquakes', **self.test_data}
        response = self.client.post(url, data)

        # Check that the response status code is as expected
        self.assertEqual(response.status_code, 200)

        # Check the content of the response
        data = json.loads(response.content)
        self.assertIn('egeojson_data', data)
        

    def tearDown(self):
        
        pass





class PrecipitationMapViewIntegrationTest(TestCase):

    def setUp(self):
        # Set up the client
        self.client = Client()

        # Set up initial data for the tests
        self.test_data2 = {
            'latlongPrecip': '7.668530,80.086758',
            'date': '2023-05-08',
            'precipitation': 22
        }

    def test_precipitation_map_view_get(self):
        # Simulate a GET request to the endpoint
        url = reverse('precipitation_map')  
        response = self.client.get(url)

        # Check whether the response status code is as expected
        self.assertEqual(response.status_code, 200)

        # Check the content of the response
        data = json.loads(response.content)
        self.assertIn('pgeojson_data', data)
        

    def test_precipitation_map_view_post(self):
        # Simulate a POST request to the endpoint
        url = reverse('precipitation_map')  
        data = {'answer': 'yes', 'sub_map_type': 'Precipitation', **self.test_data2}
        response = self.client.post(url, data)

        # Check whether the response status code is as expected
        self.assertEqual(response.status_code, 200)

        # Check the content of the response
        data = json.loads(response.content)
        self.assertIn('pgeojson_data', data)
        

    def tearDown(self):
        
        pass





#test models-----------


class MapsModelTest(TestCase):

    def setUp(self):
        # Set up a user for testing
        self.user = User.objects.create_user(username='testuser', password='testpassword')

        # Set up initial data for the tests
        self.test_data = {
            'mapid': 'mp1',
            'id': self.user,
            'type': 'test_type',
            'created_at': datetime.now(),
            'updated_at': datetime.now()
        }

    def test_maps_model_save(self):
        # Create a Maps object
        map_obj = Maps(**self.test_data)
        map_obj.save()

        # Retrieve the saved object from the database
        saved_map = Maps.objects.get(mapid='mp1')  

        # Check that the object was saved correctly
        self.assertEqual(saved_map.mapid, 'mp1')
        self.assertEqual(saved_map.id, self.user)
        self.assertEqual(saved_map.type, 'test_type')
       

    def tearDown(self):
        
        pass




class ClimateDataModelTest(TestCase):

    def setUp(self):
        # Set up a user for testing
        self.user = User.objects.create_user(username='testuser', password='testpassword')

        # Set up initial data for the tests
        self.map_obj = Maps.objects.create(
            mapid='mp1',
            id=self.user,
            type='test_type',
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        self.test_data = {
            'climateId': 'clmt1',
            'mapid': self.map_obj,
            'climatMapType': 'test_climate_type'
        }

    def test_climate_data_model_save(self):
        # Create a ClimateData object
        climate_data_obj = ClimateData(**self.test_data)
        climate_data_obj.save()

        # Retrieve the saved object from the database
        saved_climate_data = ClimateData.objects.get(climateId='clmt1')  

        # Check that the object was saved correctly
        self.assertEqual(saved_climate_data.climateId, 'clmt1')
        self.assertEqual(saved_climate_data.mapid, self.map_obj)
        self.assertEqual(saved_climate_data.climatMapType, 'test_climate_type')
        

    def tearDown(self):
       
        pass




class GeologicalDataModelTest(TestCase):

    def setUp(self):
        # Set up a user for testing
        self.user = User.objects.create_user(username='testuser', password='testpassword')

        # Set up initial data for the tests
        self.map_obj = Maps.objects.create(
            mapid='mp1',
            id=self.user,
            type='test_type',
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        self.test_data = {
            'geodataid': 'geomp1',
            'mapid': self.map_obj,
            'geomapType': 'test_geological_type'
        }

    def test_geological_data_model_save(self):
        # Create a Geological_Data object
        geological_data_obj = Geological_Data(**self.test_data)
        geological_data_obj.save()

        # Retrieve the saved object from the database
        saved_geological_data = Geological_Data.objects.get(geodataid='geomp1') 
        # Check that the object was saved correctly
        self.assertEqual(saved_geological_data.geodataid, 'geomp1')
        self.assertEqual(saved_geological_data.mapid, self.map_obj)
        self.assertEqual(saved_geological_data.geomapType, 'test_geological_type')
        

    def tearDown(self):
        
        pass




class EarthquakesModelTest(TestCase):

    def setUp(self):
        # Set up a user for testing
        self.user = User.objects.create_user(username='testuser', password='testpassword')

        # Set up initial data for the tests
        self.map_obj = Maps.objects.create(
            mapid='mp1',
            id=self.user,
            type='test_type',
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        self.geological_data_obj = Geological_Data.objects.create(
            geodataid='geomp1',
            mapid=self.map_obj,
            geomapType='test_geological_type'
        )

        self.test_data = {
            'earthquakeid': 'eq1',
            'geodataid': self.geological_data_obj,
            'dateTime': datetime.now(),
            'epiLatLong': Point(80.086758, 7.668530),
            'magnitude': 5,
            'depth': 22
        }

    def test_earthquakes_model_save(self):
        # Create an Earthquakes object
        earthquakes_obj = Earthquakes(**self.test_data)
        earthquakes_obj.save()

        # Retrieve the saved object from the database
        saved_earthquakes = Earthquakes.objects.get(earthquakeid='eq1')  
        # Check that the object was saved correctly
        self.assertEqual(saved_earthquakes.earthquakeid, 'eq1')
        self.assertEqual(saved_earthquakes.geodataid, self.geological_data_obj)
        

    def tearDown(self):
        
        pass





class SoilTypeModel(TestCase):

    def setUp(self):
        # Set up a user for testing
        self.user = User.objects.create_user(username='testuser', password='testpassword')

        # Set up initial data for the tests
        self.map_obj2 = Maps.objects.create(
            mapid='mp2',
            id=self.user,
            type='test_type',
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        self.geological_data_obj2 = Geological_Data.objects.create(
            geodataid='geomp3',
            mapid=self.map_obj2,
            geomapType='test_geological_type'
        )

        self.test_data3 = {
            'soiltypeid': 'st1',
            'geodataid': self.geological_data_obj2,
            'soiltype': 'black soil',
            'soilLatLong': Point(80.086758, 7.668530),
            'soildepth': 8,
            
        }

    def test_soiltype_model_save(self):
        # Create an Earthquakes object
        soiltype_object = soilType(**self.test_data3)
        soiltype_object.save()

        # Retrieve the saved object from the database
        saved_soiltype = soilType.objects.get(soiltypeid='st1')  
        # Check that the object was saved correctly
        self.assertEqual(saved_soiltype.soiltypeid, 'st1')
        self.assertEqual(saved_soiltype.geodataid, self.geological_data_obj2)
        

    def tearDown(self):
        
        pass




class PrecipitationModel(TestCase):

    def setUp(self):
        # Set up a user for testing
        self.user = User.objects.create_user(username='testuser', password='testpassword')

        # Set up initial data for the tests
        self.map_obj3 = Maps.objects.create(
            mapid='mp3',
            id=self.user,
            type='test_type',
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        self.climate_data_object1 = ClimateData.objects.create(
            climateId='clmt1',
            mapid=self.map_obj3,
            climatMapType='test_climate_map_type'
        )

        self.test_data5 = {
            'precipId': 'prec1',
            'climateId': self.climate_data_object1,
            'date': date(2023, 5, 8),
            'latlongPrecip': Point(80.086758, 7.338530),
            'precipitation': 8,
            
        }

    def test_precipitationmodel_save(self):
        # Create an Precipitation object
        precipitation_object = Precipitation(**self.test_data5)
        precipitation_object.save()

        # Retrieve the saved object from the database
        saved_precipitaion_object = Precipitation.objects.get(precipId='prec1')  
        # Check that the object was saved correctly
        self.assertEqual(saved_precipitaion_object.precipId, 'prec1')
        self.assertEqual(saved_precipitaion_object.climateId, self.climate_data_object1)
        

    def tearDown(self):
        
        pass





#test forms


# class EarthquakesFormTest(TestCase):
#     def setUp(self):
#         # Settin up any necessary data for  tests
#         user = User.objects.create(username='testuser', password='testpassword') #create a user object
#         map_instance = Maps.objects.create(id=user, type="geological_data", created_at="2023-01-01", updated_at="2023-01-01") # create a map instance
#         self.geological_data_instance = Geological_Data.objects.create(mapid=map_instance, geomapType='Earthquakes') #create a geological map instance

#     def test_valid_form(self):
#         form_data = {
#             'geodataid': self.geological_data_instance.geodataid,
#             'dateTime': '2023-01-01 12:00:00',
#             'epiLatLong': '7.668530,80.086758',
#             'magnitude': 5.0,
#             'depth': 10.0,
#         }
#         form = EarthquakesForm(data=form_data)
#         self.assertTrue(form.is_valid())

#     def test_invalid_form(self):
#         # Test the form with invalid data
#         form_data = {
#             'geodataid': self.geological_data_instance.geodataid,
#             'dateTime': '2023/01/01 12-00-00',
#             'epiLatLong': '7.668530-80.086758',
#             'magnitude': '5',  # should be a float
#             'depth': '10',  # should be a float
#         }
#         form = EarthquakesForm(data=form_data)
#         self.assertFalse(form.is_valid())
#         self.assertIn('dateTime', form.errors)
#         self.assertIn('epiLatLong', form.errors)
#         # self.assertIn('magnitude', form.errors)
#         # self.assertIn('depth', form.errors)