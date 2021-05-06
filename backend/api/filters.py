from django_filters import FilterSet, ModelChoiceFilter

from api.models import Baby


def get_babies(request):
    if request is None:
        return Baby.objects.none()
    return Baby.objects.filter(guardian__user=request.user)


class DiaperFilter(FilterSet):
    baby = ModelChoiceFilter(queryset=get_babies)


class NapFilter(FilterSet):
    baby = ModelChoiceFilter(queryset=get_babies)


class FeedFilter(FilterSet):
    baby = ModelChoiceFilter(queryset=get_babies)
