from django.contrib import admin
from django.urls import path
from api.views import analyze

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/analyze/', analyze, name='analyze'),
]
