import os

from core.services.jwt_service import ActivateToken, JWTService, RecoveryToken

from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template


class EmailService:
    url = os.environ.get('office_link')

    @staticmethod
    def __send_email(to: str, templates_name: str, context: dict, subject: ''):
        templates = get_template(templates_name)
        html_content = templates.render(context)
        message = EmailMultiAlternatives(subject, from_email=os.environ.get('EMAIL_HOST_USER'), to=[to])
        message.attach_alternative(html_content, "text/html")
        message.send()

    @classmethod
    def register_email(cls, user):
        token = JWTService.create_token(user, ActivateToken)
        url = f'http://localhost/auth/{token}/activate'
        cls.__send_email(user.email, 'register.html', {'name': user.profile.name, 'url': url}, 'Register')

    @classmethod
    def recovery_password_by_email(cls, user):
        token = JWTService.create_token(user, RecoveryToken)
        url = f'http://localhost/auth/password_recovery/{token}'
        cls.__send_email(user.email, 'recovery.html', {'name': user.profile.name, 'url': url}, 'Recovery Password')

    @classmethod
    def password_changed(cls, user):
        print(user)
        cls.__send_email(user.email, 'password_changed.html', {'name': user.profile.name}, 'Changed Password')

    @classmethod
    def confirm_order_email(cls, user, order_id):
        cls.__send_email(user.email, 'order_confirm.html', {'name': user.profile.name, 'order': order_id, 'url': cls.url}, 'Order Confirmed')

    @classmethod
    def user_reject_order_email(cls, user, order_id):
        cls.__send_email(user.email, 'user_reject_order_email.html', {'name': user.profile.name, 'order': order_id, 'url': cls.url}, 'Order Rejected')

    @classmethod
    def admin_reject_order_email(cls, user, order_id, data, admin):
        cls.__send_email(user.email, 'admin_reject_order_email.html', {'name': user.profile.name, 'order': order_id, 'data': data, 'admin': admin,
                                                                       'url': cls.url}, 'Order Rejected')

    @classmethod
    def taken_order_email(cls, user, order_id):
        cls.__send_email(user.email, 'taken_order_email.html', {'name': user.profile.name, 'order': order_id, 'url': cls.url}, 'Order Taken')

    @classmethod
    def done_order_email(cls, user, order_id):
        cls.__send_email(user.email, 'done_order_email.html', {'name': user.profile.name, 'order': order_id, 'url': cls.url}, 'Order Done')

    @classmethod
    def payed_order_email(cls, user, order_id):
        cls.__send_email(user.email, 'paid_order_email.html', {'name': user.profile.name, 'order': order_id, 'url': cls.url}, 'Order Payed')

    @classmethod
    def employee_remove_order_email(cls, user, order_id, employee):
        cls.__send_email(user.email, 'employee_remove_order_email.html', {'name': user.profile.name, 'order': order_id, 'employee': employee,
                                                                          'url': cls.url}, 'Order Inconvenience')

        cls.__send_email(employee.email, 'remove_employee.html', {'name': employee.profile.name, 'order_id': order_id}, 'Order Inconvenience')

    @classmethod
    def employee_order_taken(cls, user, order):
        cls.__send_email(user.email, 'employee_order_notification.html', {'name': user.profile.name, 'order': order, 'url': cls.url}, 'Order Taken')

    @classmethod
    def activate_request(cls, user):
        token = JWTService.create_token(user, ActivateToken)
        url = f'http://localhost/auth/{token}/activate'
        cls.__send_email(user.email, 'activate_request.html', {'name': user.profile.name, 'url': url}, 'Activate Request')

    @classmethod
    def request_of_reject(cls, admin, employee, reason, order_id):
        url = f'http://localhost/admin/order/{order_id}/details'
        cls.__send_email(admin.email, 'request_of_reject.html', {'admin': admin, 'employee': employee, 'reason': reason, 'url': url, 'id': order_id},
                         'Activate Request')
