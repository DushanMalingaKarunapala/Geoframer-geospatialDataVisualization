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
from .models import Map
# Create your views here.


def visualizationsHome(request):
    maps = Map.objects.all()
    return render(request, 'visualizationsHome.html', {'maps': maps})


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
