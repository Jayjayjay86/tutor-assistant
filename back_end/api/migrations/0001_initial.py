# Generated by Django 4.1.1 on 2023-08-04 07:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Student",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                ("name", models.CharField(max_length=50)),
                ("lessons_remaining", models.IntegerField()),
                ("created", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "verbose_name": "Student",
                "verbose_name_plural": "Students",
            },
        ),
        migrations.CreateModel(
            name="Lesson",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                ("subject", models.CharField(max_length=50)),
                ("lesson_data", models.JSONField()),
                ("created", models.DateTimeField(auto_now_add=True)),
                (
                    "student",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.DO_NOTHING, to="api.student"
                    ),
                ),
            ],
            options={
                "verbose_name": "Student",
                "verbose_name_plural": "Students",
            },
        ),
    ]
