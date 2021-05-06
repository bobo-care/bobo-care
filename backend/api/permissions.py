from rest_framework import permissions

from api.models import Baby, Guardian


def is_guardian(babies, obj, user):
    if hasattr(obj, 'baby'):
        return obj['baby'] in babies
    if isinstance(obj, Baby):
        return obj in babies
    if hasattr(obj, 'guardian'):
        return obj['guardian'] == user
    return False


class IsGuardian(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        babies = Baby.objects.filter(guardian__user=request.user, guardian__status=Guardian.GuardianStatus.ACTIVE)
        return is_guardian(babies, obj, request.user)


class GuardianPermissions(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if isinstance(obj, Baby):
            babies = Baby.objects.filter(guardian__user=request.user, guardian__status=Guardian.GuardianStatus.ACTIVE)
            return is_guardian(babies, obj, request.user)
        if (obj.email != request.user.email) & (view.action in ['accept', 'reject']):
            return False
        return True
