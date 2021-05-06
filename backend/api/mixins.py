from api.models import Baby


class CreateGuardedModelMixin:
    def perform_create(self, serializer):
        if 'baby' in serializer.validated_data:
            self.check_object_permissions(request=self.request, obj=serializer.validated_data['baby'])
        serializer.save()

    def get_babies(self):
        return Baby.objects.filter(guardian__user=self.request.user)
