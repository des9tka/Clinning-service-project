# Generated by Django 4.1.6 on 2023-02-10 18:51

import django.db.models.deletion
from django.db import migrations, models

import backend.apps.orders.services


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_remove_ordermodel_photo_ordermodel_footage_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ordermodel',
            name='photos',
        ),
        migrations.AlterField(
            model_name='ordermodel',
            name='footage',
            field=models.IntegerField(),
        ),
        migrations.CreateModel(
            name='AddPhotoToOrderModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photos', models.ImageField(upload_to=backend.apps.orders.services.upload_photos)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='orders.ordermodel')),
            ],
            options={
                'db_table': 'orders_photos',
            },
        ),
    ]
