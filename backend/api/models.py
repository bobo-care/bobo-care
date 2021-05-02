from django.db import models


# Create your models here.


class Baby(models.Model):
    name = models.CharField(max_length=255)
    born = models.DateField()

    class Meta:
        verbose_name_plural = "babies"

    def __str__(self):
        return self.name


class Diaper(models.Model):
    list_display = ('baby', 'time')
    baby = models.ForeignKey(Baby, on_delete=models.CASCADE)
    poop = models.BooleanField()
    wet = models.BooleanField()
    time = models.DateTimeField()


class Nap(models.Model):
    baby = models.ForeignKey(Baby, on_delete=models.CASCADE)
    startTime = models.DateTimeField()
    endTime = models.DateTimeField()


class Feed(models.Model):
    baby = models.ForeignKey(Baby, on_delete=models.CASCADE)
    startTime = models.DateTimeField()
    quantity = models.IntegerField()
    unit = models.CharField(max_length=255)
    foodType = models.CharField(max_length=255)
