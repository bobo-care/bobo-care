# Generated by Django 3.2 on 2021-05-05 08:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_nap_endtime'),
    ]

    operations = [
        migrations.RenameField(
            model_name='feed',
            old_name='foodType',
            new_name='food_type',
        ),
        migrations.RenameField(
            model_name='feed',
            old_name='startTime',
            new_name='start_time',
        ),
        migrations.RenameField(
            model_name='nap',
            old_name='endTime',
            new_name='end_time',
        ),
        migrations.RenameField(
            model_name='nap',
            old_name='startTime',
            new_name='start_time',
        ),
    ]
