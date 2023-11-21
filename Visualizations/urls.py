from django.urls import path
from . import views

urlpatterns = [
    path('visualizationsHome', views.visualizationsHome, name = 'visualizationsHome' ),
    
    
]