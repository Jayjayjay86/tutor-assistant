# Generated by Django 4.1.1 on 2023-08-04 12:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="lesson",
            options={"verbose_name": "Lesson", "verbose_name_plural": "Lessons"},
        ),
        migrations.AddField(
            model_name="student",
            name="isonline",
            field=models.BooleanField(default=False),
        ),
    ]