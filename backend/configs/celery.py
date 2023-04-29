import os

from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'configs.settings')
app = Celery('configs')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

app.conf.beat_schedule = {
    "check_overdue_orders": {
        "task": "apps.order.views.checkOverdueOrders",
        "schedule": crontab(minute=0, hour=23, day_of_week='*', day_of_month='*', month_of_year='*')
    }
}

