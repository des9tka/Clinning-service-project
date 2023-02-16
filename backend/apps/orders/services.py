import os.path
from uuid import uuid1


def upload_photos(instance, file: str) -> str:
    extension = file.split('.')[-1]
    return os.path.join(instance.order.user.email, f'{instance.order.id}', f'{uuid1()}.{extension}')


def upload_task_txt(instance, txt: str) -> str:
    try:
        with open('task', 'w') as file:
            file.write(txt)
        return os.path.join('storage', instance.order.user.email, f'{instance.order.id}', txt)
    except (Exception,):
        return 'Details : Invalid task description'
