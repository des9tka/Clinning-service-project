import time

from django.core.management import BaseCommand
from django.db import OperationalError, connection
from django.db.backends.mysql.base import DatabaseWrapper

connection: DatabaseWrapper = connection


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        self.stdout.write('Waiting for DataBase...')
        db = False

        while not db:
            try:
                connection.ensure_connection()
                db = True
            except OperationalError:
                self.stdout.write('DataBase is unavailable, wait a bit...')
                time.sleep(1)

        self.stdout.write('DataBase is available!')
