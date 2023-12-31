# Generated by Django 4.1.1 on 2023-08-04 13:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0003_remove_lesson_lesson_data_remove_student_isonline_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Register",
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
                ("attendance_data", models.JSONField()),
                ("date", models.DateField()),
                ("created", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "verbose_name": "The Register",
                "verbose_name_plural": "Registries",
            },
        ),
    ]
