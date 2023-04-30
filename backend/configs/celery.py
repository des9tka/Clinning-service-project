import os

from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'configs.settings')
app = Celery('configs')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.update(
    timezone="Europe/Kiev",
)


app.conf.beat_schedule = {
    "check_overdue_orders": {
        "task": "apps.orders.celery_tasks.checkOverdueOrders",
        "schedule": crontab(minute=52, hour=13)
    }
}
