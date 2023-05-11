import time

from django.core.management import BaseCommand, call_command
from django.db import OperationalError, connection
from django.db.backends.mysql.base import DatabaseWrapper

from apps.c_services.models import ServiceModel
from apps.orders.models import OrderStatusModel

connection: DatabaseWrapper = connection


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        db = False
        while not db:
            try:
                connection.ensure_connection()
                db = True
            except OperationalError:
                time.sleep(1)
        call_command('makemigrations')
        call_command('migrate')
        all_tables = connection.introspection.table_names()
        table = set('my_cache_table')
        exist = table.union(all_tables)
        if 'my_cache_table' not in exist:
            call_command('createcachetable')

        if ServiceModel.objects.count() == 0:

            ServiceModel.objects.create(name='SetUp', address='SetUp', city='SetUp')

        if OrderStatusModel.objects.count() != 7:
            OrderStatusModel.objects.all().delete()
            OrderStatusModel.objects.create(name='pending')
            OrderStatusModel.objects.create(name='admin_approved')
            OrderStatusModel.objects.create(name='user_confirmed')
            OrderStatusModel.objects.create(name='rejected')
            OrderStatusModel.objects.create(name='taken')
            OrderStatusModel.objects.create(name='done')
            OrderStatusModel.objects.create(name='paid')
