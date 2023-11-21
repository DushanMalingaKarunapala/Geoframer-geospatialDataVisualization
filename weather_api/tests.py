from django.test import TestCase, Client
from django.test import SimpleTestCase

from django.urls import reverse, resolve
from weather_api.views import index, result

# testurls.


class TestUrls(SimpleTestCase):

    def test_home_url_is_resolve(self):
        url = reverse('result')
        print(resolve(url))
        self.assertEquals(resolve(url).func, result)


# test views
class TestViews(TestCase):
    def setUp(self):
        self.client = Client()

    #test index view    

    def test_index_view(self):
        # Issue a GET request to the index view
        response = self.client.get(reverse('home'))

        # Check that the response is successful
        self.assertEqual(response.status_code, 200)

        # Check that the correct template is used
        self.assertTemplateUsed(response, 'home.html')


    #test results view

    def test_result_view_post(self):
        url = reverse('result')  
        response = self.client.post(url, {'city': 'New York'})

        # expecting a successful response
        self.assertEqual(response.status_code, 200)

        
        
        self.assertContains(response, 'New York')
        self.assertContains(response, 'wind')
        # print(response.content.decode())
        # print(response.context)


        # Add more checks based on your expected response content



