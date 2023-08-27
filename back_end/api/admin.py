from django.contrib import admin
from .models import Student, Lesson, Register

admin.site.site_header = "Tutorland"

admin.site.register(Student)
admin.site.register(Lesson)
admin.site.register(Register)
