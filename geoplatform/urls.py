"""
URL configuration for geoplatform project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from Design.views import *
from Design import views
urlpatterns = [
    path('', include('homepage.urls')),
    path('', include('weather_api.urls')),
    path('', include('Design.urls')),
    path('', include('ThirdDimensionModels.urls')),
    path('', include('Visualizations.urls')),
    path('', include('geocoords.urls')),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('get/', views.get, name='get'),
    path('api/keplergl_earthquakes_map/',
         EarthquakesMapView.as_view(), name='earthquakes_map'),
    path('api/keplergl_precipitation_map/',
         PrecipitationMapView.as_view(), name='precipitation_map'),
    path('api/waterbody_map/', WaterBodiesMapView.as_view(), name='waterbodies_map'),

    path('', include('paypal.standard.ipn.urls')),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
