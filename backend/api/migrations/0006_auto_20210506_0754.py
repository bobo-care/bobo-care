# Generated by Django 3.2 on 2021-05-06 07:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0005_auto_20210505_0826'),
    ]

    operations = [
        migrations.AddField(
            model_name='guardian',
            name='email',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='guardian',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='guardian_owner', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='guardian',
            name='status',
            field=models.CharField(choices=[('NEW', 'New'), ('INVITATION_SENT', 'Invitation sent'), ('REJECTED', 'Rejected'), ('ACTIVE', 'Active')], default='NEW', max_length=50),
        ),
        migrations.AlterField(
            model_name='guardian',
            name='baby',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.baby'),
        ),
        migrations.AlterField(
            model_name='guardian',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='guardian_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
