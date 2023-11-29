from django.shortcuts import render
from .models import Map
from paypal.standard.forms import PayPalPaymentsForm
from django.conf import settings
import uuid
from django.urls import reverse
from django.views import View
from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from .models import Map, MapType, DataType
from django.db.models import Q
# Create your views here.


def visualizationsHome(request):
    # Get all map types and data types for filtering
    maps = Map.objects.all()
    map_types = MapType.objects.all()
    data_types = DataType.objects.all()
    return render(request, 'visualizationsHome.html', {'maps': maps, 'map_types': map_types, 'data_types': data_types})


def filteredVisualizations(request):
    # Get parameters from the request
    search_keyword = request.GET.get('searchKeyword', '')
    map_type_filter = request.GET.get('mapTypeFilter', '')
    data_type_filter = request.GET.get('dataTypeFilter', '')
    maps = Map.objects.all()
    # Apply filters based on parameters
    if search_keyword:
        # Use Q objects for OR conditions
        maps = maps.filter(Q(title__icontains=search_keyword))
    if map_type_filter:
        maps = maps.filter(map_type__name=map_type_filter)

    if data_type_filter:
        maps = maps.filter(data_type__name=data_type_filter)

    # Get all map types and data types for filtering
    map_types = MapType.objects.all()
    data_types = DataType.objects.all()
    return render(request, 'visualizationsHome.html', {'maps': maps, 'map_types': map_types, 'data_types': data_types})


# def searchandfilter(request):
#     search_keyword = request.GET.get('searchKeyword', '')
#     searched_maps = Map.objects.filter(title__icontains=search_keyword)
#     return render(request, 'visualizationsHome.html', {'searched_maps': searched_maps})


def checkout(request, pk):
    mapproduct = Map.objects.get(id=pk)

    host = request.get_host()

    paypal_checkout = {
        'business': settings.PAYPAL_RECEIVER_EMAIL,
        'amount': mapproduct.price,
        'map_name': mapproduct.title,
        'invoice': uuid.uuid4(),
        'currency_code': 'USD',
        'notify_url': f"http://{host}{reverse('paypal-ipn')}",
        'return_url': f"http://{host}{reverse('payment-success', kwargs={'pk':mapproduct.id})}",
        'cancel_url': f"http://{host}{reverse('payment-failed', kwargs={'pk':mapproduct.id})}",

    }
    paypal_payment = PayPalPaymentsForm(initial=paypal_checkout)

    context = {
        'mapproduct': mapproduct,
        'paypal': paypal_payment
    }
    return render(request, "checkout.html", context)


def payment_successfull(request, pk):
    mapproduct = Map.objects.get(id=pk)
    context = {'mapproduct': mapproduct}
    return render(request, "payment-successfull.html", context)


def payment_faild(request, pk):
    mapproduct = Map.objects.get(id=pk)
    context = {'mapproduct': mapproduct}
    return render(request, "payment-faild.html", context)


# download map view

@method_decorator(login_required, name='dispatch')
class DownloadMapView(View):
    def get(self, request, pk):
        mapproduct = get_object_or_404(Map, id=pk)

        # Assuming your map_file field contains the file path
        file_path = mapproduct.map_file.path

        with open(file_path, 'rb') as file:
            response = HttpResponse(
                file.read(), content_type='application/octet-stream')
            response['Content-Disposition'] = f'attachment; filename="{mapproduct.title}.jpg"'
            return response
