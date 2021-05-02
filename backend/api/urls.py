from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'naps', views.NapViewSet)
router.register(r'diapers', views.DiaperViewSet)
router.register(r'feeds', views.FeedViewSet)
router.register(r'babies', views.BabyViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
