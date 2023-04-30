from datetime import timedelta

from configs.celery import app
from core.services.email_service import EmailService

from django.utils import timezone

from apps.orders.models import OrderModel


@app.task
def checkOverdueOrders():
    orders_to_notify = []
    orders = OrderModel.objects.filter(status=6)
    for order in orders:
        time_difference = timezone.now().date() - order.done_at
        if timedelta(days=1) < time_difference < timedelta(days=2):
            EmailService.order_pay_notification(order.id, order.user_id, 2)
        elif timedelta(days=2) < time_difference < timedelta(days=3):
            EmailService.order_pay_notification(order.id, order.user_id, 1)
        if time_difference > timedelta(days=3):
            orders_to_notify.append(order.id)

    if orders_to_notify:
        EmailService.checked_overdue_order(orders_to_notify)
