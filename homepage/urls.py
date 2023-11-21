from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name = 'home' ),
    path('register/', views.register_user, name='register'),
    path('login/', views.loginuser, name='login'),
    path('logout/', views.logoutuser, name='logout'),
    path('myprofile/', views.profile, name='myprofile')
    
]