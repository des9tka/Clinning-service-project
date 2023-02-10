from django.conf.urls.static import static
from django.urls import include, path

from configs import settings

urlpatterns = [
    path('auth', include('apps.auth.urls')),
    path('users', include('apps.users.urls')),
    path('services', include('apps.services.urls')),
    path('orders', include('apps.orders.urls'))
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
