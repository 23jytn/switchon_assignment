
import time
import requests
import datetime
import random



while(True):

    url = "http://localhost:8000/api/sensors/"

    temperature = random.triangular(0,45)

    relative_humidity = random.triangular(0,90)

    absolute_humidity = random.triangular(0,2)

    payload = "{\"temperature\":%f,\"relative_humidity\":%f,\"absolute_humidity\":%f,\"timestamp\":%s}" % (temperature, relative_humidity, absolute_humidity, str(int(time.time())))
    
    #print(payload)    
    
    headers = {}

    response = requests.request("POST", url, data=payload, headers=headers)

    #print("%f %f %f %s" % ( temperature, relative_humidity, absolute_humidity, str(int(time.time())) ) )

    #print("inserted data in one second "+str(int(time.time())))

    #print(temperature,relative_humidity,absolute_humidity)

    time.sleep(1)