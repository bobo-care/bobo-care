from django.contrib import admin

from api.models import Nap, Feed, Diaper, Baby


@admin.register(Diaper)
class DiaperAdmin(admin.ModelAdmin):
    list_display = ('baby', 'time', 'poop', 'wet')


@admin.register(Nap)
class NapAdmin(admin.ModelAdmin):
    list_display = ('baby', 'start_time', 'end_time')


@admin.register(Baby)
class BabyAdmin(admin.ModelAdmin):
    list_display = ('name', 'born')


@admin.register(Feed)
class FeedAdmin(admin.ModelAdmin):
    list_display = ('baby', 'start_time', 'quantity', 'unit')
