from rest_framework import serializers

from django.contrib.auth.models import User
from api.models import Nap, Baby, Feed, Diaper, Guardian


class NapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nap
        fields = ['id', 'baby', 'start_time', 'end_time']


class BabySerializer(serializers.ModelSerializer):
    class Meta:
        model = Baby
        fields = ['id', 'name', 'born']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name']


class GuardianSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    baby_data = BabySerializer(source='baby', read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Guardian
        fields = ['id', 'baby', 'baby_data', 'email', 'owner', 'user', 'status']


class FeedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feed
        fields = ['id', 'baby', 'start_time', 'quantity', 'unit', 'food_type']


class DiaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diaper
        fields = ['id', 'baby', 'time', 'poop', 'wet']
