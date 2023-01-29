from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, password, **kwargs):
        if not email:
            raise ValueError('Required field "email')

        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **kwargs):
        kwargs.setdefault('is_active', True)
        kwargs.setdefault('is_employee', True)
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_superuser', True)

        user = self.create_user(email, password, **kwargs)
        return user
