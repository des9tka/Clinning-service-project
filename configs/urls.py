from django.urls import include, path

urlpatterns = [
    path('auth', include('apps.auth.urls')),
    path('users', include('apps.users.urls')),
    path('services', include('apps.services.urls'))
]
