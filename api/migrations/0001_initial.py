# Generated by Django 2.0.4 on 2018-04-07 12:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SensorData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.IntegerField()),
                ('temprature', models.FloatField(default=0.0)),
                ('relative_humidity', models.FloatField(default=0.0)),
                ('absolute_humidity', models.FloatField(default=0.0)),
            ],
        ),
    ]
