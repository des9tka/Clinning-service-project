import os.path
from uuid import uuid1


def upload_photos(instance, file: str) -> str:
    extension = file.split('.')[-1]
    return os.path.join(instance.order.user.email, f'{instance.order.id}', f'{uuid1()}.{extension}')
