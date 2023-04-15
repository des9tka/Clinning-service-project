import datetime
from enum import Enum


class ActionEnum(Enum):
    ACTIVATE = ('activate', datetime.timedelta(minutes=60))
    RECOVERY = ('recovery', datetime.timedelta(minutes=10))

    def __init__(self, token_type, expired_time):
        self.expired_time = expired_time
        self.token_type = token_type
