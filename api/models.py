#from django.db import models
from djongo import models
# Create your models here.


class SensorData(models.Model):
    timestamp = models.IntegerField(default=0)
    temperature = models.FloatField(default=0)
    relative_humidity  = models.FloatField(default=0.00)
    absolute_humidity = models.FloatField(default=0.00)