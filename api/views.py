from django.shortcuts import render
#import requests
# Create your views here.
from rest_framework import status 
from rest_framework.decorators import api_view 
from rest_framework.response import Response 
import json
from django.http import HttpResponse
from django.core import serializers
from .models import SensorData
import datetime

@api_view(['GET', 'POST'])
def handle_sensor(request):
    if request.method == 'GET':
        #print(data)
        start = int(request.GET.get('start'))
        limit = int(request.GET.get('limit'))
        end = start + limit 
        print(start,limit)
        data = serializers.serialize('json', SensorData.objects.all()[start:end])

        return HttpResponse(data, content_type="application/json")
    elif request.method == 'POST':
        data = SensorData()
        #data.timestamp = datetime.datetime.fromtimestamp()
        #data.save()
        #print(data)
        
        body_unicode = request.body.decode('utf-8') 
        body = json.loads(body_unicode) 
        data.absolute_humidity = float(body['relative_humidity'])
        data.relative_humidity = float(body['absolute_humidity'])
        data.temperature = float(body['temperature'])
        data.timestamp = int(body['timestamp'])
        data.save()
        #print(absolute_humidity,relative_humidity,temperature)
        return HttpResponse(status=201)