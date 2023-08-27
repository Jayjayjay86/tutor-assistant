from django.db import models


class Student(models.Model):
    id = models.AutoField(primary_key=True, auto_created=True, unique=True)
    name = models.CharField(max_length=50, unique=True)
    lessons_remaining_grammar_only = models.IntegerField(
        default=0, blank=True, null=True
    )
    lessons_remaining_native_only = models.IntegerField(
        default=0, blank=True, null=True
    )
    lessons_remaining = models.IntegerField(default=0, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Student"
        verbose_name_plural = "Students"


class Lesson(models.Model):
    id = models.AutoField(primary_key=True, auto_created=True, unique=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    subject = models.CharField(max_length=50)
    time = models.TimeField()
    day = models.CharField(max_length=10)
    isonline = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.name} - {self.subject} - {self.day}"

    class Meta:
        verbose_name = "Lesson"
        verbose_name_plural = "Lessons"


class Register(models.Model):
    id = models.AutoField(primary_key=True, auto_created=True, unique=True)
    attendance_data = models.JSONField()
    date = models.DateField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.date}"

    class Meta:
        verbose_name = "The Register"
        verbose_name_plural = "Registries"
