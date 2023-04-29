from datetime import timedelta

from core.services.email_service import EmailService
from django_cron import CronJobBase, Schedule

from django.utils import timezone

from apps.orders.models import OrderModel


class OrderCheck(CronJobBase):
    RUN_AT_TIMES = ['22:27']

    schedule = Schedule(run_at_times=RUN_AT_TIMES)
    code = 'order.order_check'

    def do(self):
        orders_to_notify = []
        orders = OrderModel.objects.filter(status=6)
        for order in orders:
            time_difference = timezone.now().date() - order.done_at
            if time_difference > timedelta(days=3):
                orders_to_notify.append(order)

        if orders_to_notify:
            EmailService.checked_overdue_order(orders_to_notify)
