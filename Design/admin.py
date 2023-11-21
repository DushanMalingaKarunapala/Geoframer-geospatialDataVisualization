from django.contrib import admin
from .models import Maps,ClimateData,TemperatureMap,HumidityMap,Precipitation,Geological_Data,Rocks,soilType,Earthquakes,mineralContent

# Register your models here.

admin.site.register(Maps)
admin.site.register(ClimateData)
admin.site.register(TemperatureMap)
admin.site.register(HumidityMap)
admin.site.register(Precipitation)
admin.site.register(Geological_Data)
admin.site.register(Earthquakes)
admin.site.register(soilType)
admin.site.register(mineralContent)

