from rest_framework import serializers

from api.models import Nap, Baby, Feed, Diaper


class NapSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Nap
        fields = ['baby', 'startTime', 'endTime']


class BabySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Baby
        fields = ['name', 'born']


class FeedSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Feed
        fields = ['baby', 'startTime']


class DiaperSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Diaper
        fields = ['baby', 'time', 'poop', 'wet']

