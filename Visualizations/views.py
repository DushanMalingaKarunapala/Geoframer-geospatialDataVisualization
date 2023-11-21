from django.shortcuts import render
from .models import Map
# Create your views here.

def visualizationsHome(request):
    maps = Map.objects.all()
    return render(request, 'visualizationsHome.html',{'maps':maps})