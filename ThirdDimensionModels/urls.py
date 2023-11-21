from django.urls import path
from . import views

urlpatterns = [
    path('modelsHome', views.modelsHome, name = 'modelsHome' ),
    
    
]