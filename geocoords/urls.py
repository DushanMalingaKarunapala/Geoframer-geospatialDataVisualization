from django.urls import path
from . import views
from .views import coordstoolhome, polygontool, polylinetool, pointtool

urlpatterns = [
    path('coordstoolhome/', views.coordstoolhome, name='coordstoolhome'),
    path('coordstoolhome/polygontool', views.polygontool, name='polygontool'),
    path('coordstoolhome/polylinetool', views.polylinetool, name='polylinetool'),
    path('coordstoolhome/pointtool', views.pointtool, name='pointtool'),

]
