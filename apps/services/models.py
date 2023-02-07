from django.db import models


class ServiceModel(models.Model):

    class Meta:
        db_table = 'services'

    name = models.CharField(max_length=128)
    address = models.CharField(max_length=128)
    photos = models.CharField(max_length=128)
