from django.shortcuts import render, redirect
from geocoords import googlekey


key = googlekey.GOOGLE_API_KEY


def coordstoolhome(request):
    context = {'key': key}
    return render(request, "CoordstoolHome.html", context)


def polygontool(request):
    context = {'key': key}
    return render(request, "indexpoly.html", context)


def polylinetool(request):
    context = {'key': key}
    return render(request, "indexline.html", context)


def pointtool(request):
    context = {'key': key}
    return render(request, "indexpoint.html", context)
