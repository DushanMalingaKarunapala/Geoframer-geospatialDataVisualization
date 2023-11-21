from django.urls import path
from . import views
from .views import  Deshome, create_map, fetch_climate_data_types, fetch_geological_data_types


urlpatterns = [
    path('Deshome/', views.Deshome, name='Deshome'),
    # path('map_created/', views.map_created, name='map_created'),
    path('create_map/', views.create_map, name='create_map'),
    path('fetch_climate_data_types/', views.fetch_climate_data_types,
         name='fetch_climate_data_types'),
    path('fetch_geological_data_types/', views.fetch_geological_data_types,
         name='fetch_geological_data_types'),
    path('get/', views.get, name='get')
    
         
    # path('keplergl_map/', views.keplergl_map, name='keplergl_map'),
    # path('keplergl_map/get_earthquake_data/' ,views.get_earthquake_data,name='get_earthquake_data' )

]
