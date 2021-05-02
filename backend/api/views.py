from django.http import HttpResponse
from rest_framework import permissions
from rest_framework import viewsets

from api.models import Baby, Nap, Diaper, Feed
from api.serializers import BabySerializer, NapSerializer, DiaperSerializer, FeedSerializer


class BabyViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows babies to be viewed or edited.
    """
    queryset = Baby.objects.all()
    serializer_class = BabySerializer
    permission_classes = [permissions.IsAuthenticated]


class NapViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows naps to be viewed or edited.
    """
    queryset = Nap.objects.all()
    serializer_class = NapSerializer
    permission_classes = [permissions.IsAuthenticated]


class DiaperViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows diapers to be viewed or edited.
    """
    queryset = Diaper.objects.all()
    serializer_class = DiaperSerializer
    permission_classes = [permissions.IsAuthenticated]


class FeedViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows diapers to be viewed or edited.
    """
    queryset = Feed.objects.all()
    serializer_class = FeedSerializer
    permission_classes = [permissions.IsAuthenticated]


def index(request):
    return HttpResponse('index')
