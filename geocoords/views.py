from django.shortcuts import render, redirect


def coordstoolhome(request):
    return render(request, "CoordstoolHome.html")

def polygontool(request):
    return render(request,"indexpoly.html")

def polylinetool(request):
    return render(request, "indexline.html")

def pointtool(request):
    return render(request, "indexpoint.html")