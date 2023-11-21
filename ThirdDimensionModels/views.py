from django.shortcuts import render

# Create your views here.

def modelsHome(request):
    return render(request, 'modelsHome.html')