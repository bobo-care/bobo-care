from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'naps', views.NapViewSet)
router.register(r'diapers', views.DiaperViewSet)
router.register(r'feeds', views.FeedViewSet)
router.register(r'babies', views.BabyViewSet)
router.register(r'guardians', views.GuardianViewSet)


def trigger_error():
    print(1 / 0)


urlpatterns = [
    path('sentry-debug/', trigger_error),
    path('', include(router.urls)),
    path('userinfo/', views.UserInfo.as_view())
]
