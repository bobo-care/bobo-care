from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class Baby(models.Model):
    name = models.CharField(max_length=255)
    born = models.DateField()

    class Meta:
        verbose_name_plural = "babies"

    def __str__(self):
        return self.name


class Guardian(models.Model):
    class GuardianStatus(models.TextChoices):
        NEW = 'NEW', 'New'
        INVITATION_SENT = 'INVITATION_SENT', 'Invitation sent'
        REJECTED = 'REJECTED', 'Rejected'
        ACTIVE = 'ACTIVE', 'Active'

    owner = models.ForeignKey(User,
                              on_delete=models.DO_NOTHING,
                              null=True,
                              related_name='guardian_owner')
    status = models.CharField(max_length=50, choices=GuardianStatus.choices, default='NEW')
    email = models.CharField(max_length=255, null=True)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, null=True)
    baby = models.ForeignKey(Baby, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class Diaper(models.Model):
    list_display = ('baby', 'time')
    baby = models.ForeignKey(Baby, on_delete=models.CASCADE)
    poop = models.BooleanField()
    wet = models.BooleanField()
    time = models.DateTimeField()


class Nap(models.Model):
    baby = models.ForeignKey(Baby, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True)


class Feed(models.Model):
    baby = models.ForeignKey(Baby, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    quantity = models.IntegerField(null=True)
    unit = models.CharField(max_length=255, null=True)
    food_type = models.CharField(max_length=255, null=True)
