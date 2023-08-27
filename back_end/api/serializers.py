from rest_framework import serializers
from .models import Student, Lesson, Register
from datetime import datetime


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["name"] = data["name"].title()
        return data


class LessonSerializer(serializers.ModelSerializer):
    student = StudentSerializer()

    class Meta:
        model = Lesson
        fields = "__all__"
        ordering = ["day"]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["subject"] = data["subject"].title()
        data["day"] = data["day"].title()
        data["time"] = datetime.strptime(data["time"], "%H:%M:%S").strftime("%-I%p")
        return data


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Register
        fields = "__all__"
