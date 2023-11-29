from django.urls import path
from . import views
from .views import DownloadMapView

urlpatterns = [
    path('visualizationsHome', views.visualizationsHome, name='visualizationsHome'),
    path('filteredVisualizations', views.filteredVisualizations, name='filteredVisualizations'),
    path('checkout/<int:pk>/', views.checkout, name="checkout"),
    path('payment-success/<int:pk>/',
         views.payment_successfull, name='payment-success'),
    path('payment-failed/<int:pk>/', views.payment_faild, name='payment-failed'),
    path('download/<int:pk>/', DownloadMapView.as_view(), name='download-map'),



]
