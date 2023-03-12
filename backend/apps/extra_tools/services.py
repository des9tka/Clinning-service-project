import os.path
from uuid import uuid1


def upload_orders_photos(instance, file: str) -> str:
    extension = file.split('.')[-1]
    return os.path.join('users', instance.order.user.email, 'orders', f'{instance.order.id}', f'{uuid1()}.{extension}')


def upload_services_photos(instance, file: str) -> str:
    extension = file.split('.')[-1]
    return os.path.join('services', instance.service.name, f'{uuid1()}.{extension}')


def upload_users_photos(instance, file: str) -> str:
    print(1)
    extension = file.split('.')[-1]
    return os.path.join('users', instance.user.email, 'photo', f'{uuid1()}.{extension}')