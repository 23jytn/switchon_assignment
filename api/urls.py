from django.urls import path  
from . import views  




urlpatterns = [     
    path('sensors/', views.handle_sensor, name='handle_sensor'), 
]
