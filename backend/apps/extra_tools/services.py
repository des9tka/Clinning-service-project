import os.path
import shutil
from uuid import uuid1


def upload_orders_photos(instance, file: str) -> str:
    extension = file.split('.')[-1]
    return os.path.join('users', instance.order.user.email, 'orders', f'{instance.order.id}', f'{uuid1()}.{extension}')


def upload_services_photos(instance, file: str) -> str:
    extension = file.split('.')[-1]
    return os.path.join('services', instance.service.name, f'{uuid1()}.{extension}')


def upload_users_photos(instance, file: str) -> str:
    image_directory = os.path.join('storage', 'users', instance.user.email, 'photo')
    if os.path.exists(image_directory):
        shutil.rmtree(image_directory)

    extension = file.split('.')[-1]
    return os.path.join('users', instance.user.email, 'photo', f'{uuid1()}.{extension}')
