from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.http import JsonResponse

from api.filters import DiaperFilter, NapFilter, FeedFilter
from api.mixins import CreateGuardedModelMixin
from api.models import Baby, Nap, Diaper, Feed, Guardian
from api.permissions import IsGuardian, GuardianPermissions
from api.serializers import BabySerializer, NapSerializer, DiaperSerializer, FeedSerializer, GuardianSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q


class BabyViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows babies to be viewed or edited.
    """
    queryset = Baby.objects.none()
    serializer_class = BabySerializer
    permission_classes = [permissions.IsAuthenticated, IsGuardian]

    def get_queryset(self):
        return Baby.objects.filter(guardian__user=self.request.user).order_by('id')

    def create(self, request, **kwargs):
        serializer = BabySerializer(data=request.data, context={'request': request})
        serializer.is_valid()
        baby = serializer.save()
        guardian = Guardian.objects.create(
            baby=baby,
            user=request.user,
            owner=request.user,
            email=request.user.email,
            status=Guardian.GuardianStatus.ACTIVE
        )
        guardian.save()
        return Response(serializer.data)


class GuardianViewSet(CreateGuardedModelMixin, viewsets.ModelViewSet):
    """
    API endpoint that allows baby guardians to be viewed or edited.
    """
    serializer_class = GuardianSerializer
    permission_classes = [permissions.IsAuthenticated, GuardianPermissions]
    queryset = Guardian.objects.none()
    http_method_names = ['get', 'post', 'head', 'delete']

    @action(detail=True, methods=['post'])
    def accept(self, request, pk):
        obj = self.get_object()
        obj.status = Guardian.GuardianStatus.ACTIVE
        obj.user = request.user
        obj.save()
        return Response(status=204)

    @action(detail=True, methods=['post'])
    def reject(self, request, pk):
        obj = self.get_object()
        obj.status = Guardian.GuardianStatus.REJECTED
        obj.user = None
        obj.save()
        return Response(status=204)

    def perform_create(self, serializer):
        self.check_object_permissions(request=self.request, obj=serializer.validated_data['baby'])
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return Guardian.objects.filter(
            Q(owner=self.request.user) | Q(user=self.request.user) | Q(email=self.request.user.email)
        ).order_by('id')


class NapViewSet(CreateGuardedModelMixin, viewsets.ModelViewSet):
    """
    API endpoint that allows naps to be viewed or edited.
    """
    queryset = Nap.objects.none()
    serializer_class = NapSerializer
    permission_classes = [permissions.IsAuthenticated, IsGuardian]
    filterset_class = NapFilter
    ordering_fields = '__all__'

    def get_queryset(self):
        return Nap.objects.filter(baby__in=self.get_babies()).order_by('id')


class DiaperViewSet(CreateGuardedModelMixin, viewsets.ModelViewSet):
    """
    API endpoint that allows diapers to be viewed or edited.
    """
    queryset = Diaper.objects.none()
    serializer_class = DiaperSerializer
    permission_classes = [permissions.IsAuthenticated, IsGuardian]
    filterset_class = DiaperFilter
    ordering_fields = '__all__'

    def get_queryset(self):
        return Diaper.objects.filter(baby__in=self.get_babies()).order_by('id')


class FeedViewSet(CreateGuardedModelMixin, viewsets.ModelViewSet):
    """
    API endpoint that allows diapers to be viewed or edited.
    """
    queryset = Feed.objects.none()
    serializer_class = FeedSerializer
    permission_classes = [permissions.IsAuthenticated, IsGuardian]
    filterset_class = FeedFilter
    ordering_fields = '__all__'

    def get_queryset(self):
        return Feed.objects.filter(baby__in=self.get_babies()).order_by('id')


class UserInfo(APIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get(self, request, format=None):
        """
        Return authenticated user details
        """
        serializer = UserSerializer(request.user)
        return JsonResponse(serializer.data)
