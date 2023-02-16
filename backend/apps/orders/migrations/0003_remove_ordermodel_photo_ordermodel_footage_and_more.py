# Generated by Django 4.1.5 on 2023-02-10 12:25

from django.db import migrations, models

import backend.apps.orders.services


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ordermodel',
            name='photo',
        ),
        migrations.AddField(
            model_name='ordermodel',
            name='footage',
            field=models.IntegerField(default=10),
        ),
        migrations.AddField(
            model_name='ordermodel',
            name='photos',
            field=models.ImageField(blank=True, upload_to=backend.apps.orders.services.upload_photos),
        ),
    ]
