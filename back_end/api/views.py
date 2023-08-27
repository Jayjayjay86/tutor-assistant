from .models import Student, Lesson
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import StudentSerializer, LessonSerializer, RegisterSerializer
from datetime import datetime
import json

from .tutorland_data import data as sd
from datetime import datetime
from django.shortcuts import HttpResponse
from django.http import JsonResponse


def populate_database(request):
    for entry in sd:
        name = entry["name"]
        student = Student.objects.create(name=name, lessons_remaining=0)

        for data in entry["lesson_data"]:
            day = data["day"]
            time = data["time"]
            subject = data["subject"]
            isonline = data["isonline"]
            Lesson.objects.create(
                student=student, day=day, time=time, subject=subject, isonline=isonline
            )
    return HttpResponse("COMPLETE")


@api_view(["GET"])
def list_students(request):
    students = Student.objects.order_by("name")
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


@api_view(["DELETE"])
def delete_student(request, pk):
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response(
            {"error": "student record not found"}, status=status.HTTP_404_NOT_FOUND
        )

        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def create_student(request):
    print(request.data)
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def retrieve_student(request, pk):
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response(
            {"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND
        )

    serializer = StudentSerializer(student)
    return Response(serializer.data)


@api_view(["PUT", "DELETE"])
def update_delete_student(request, pk):
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response(
            {"error": "Expense not found"}, status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "PUT":
        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
def list_lessons(request):
    lessons = Lesson.objects.order_by("student")
    serializer = LessonSerializer(lessons, many=True)
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


@api_view(["DELETE"])
def delete_lesson(request, pk):
    try:
        lesson = Lesson.objects.get(pk=pk)
    except Lesson.DoesNotExist:
        return Response(
            {"error": "lesson record not found"}, status=status.HTTP_404_NOT_FOUND
        )

        lesson.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["POST"])
def create_lesson(request):
    print(request.data)

    student = Student.objects.get(id=request.data["student"])
    is_online = request.data["is_online"]
    grammar_day = request.data["grammarDay"]
    native_day = request.data["nativeDay"]
    grammar_time = request.data["grammarTime"]
    native_time = request.data["nativeTime"]
    if grammar_day:
        Lesson.objects.create(
            student=student, isonline=is_online, day=grammar_day, time=grammar_time
        )
        print("make my grammar day")
    if native_day:
        Lesson.objects.create(
            student=student, isonline=is_online, day=native_day, time=native_time
        )
        print("make my native day")
    return Response(status=status.HTTP_201_CREATED)


@api_view(["GET"])
def retrieve_lesson(request, pk):
    try:
        lesson = Lesson.objects.get(pk=pk)
    except Lesson.DoesNotExist:
        return Response({"error": "lesson not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = LessonSerializer(lesson)
    return Response(serializer.data)


@api_view(["PUT", "DELETE"])
def update_delete_lesson(request, pk):
    try:
        lesson = Lesson.objects.get(pk=pk)
    except Lesson.DoesNotExist:
        return Response({"error": "lesson not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "PUT":
        serializer = LessonSerializer(lesson, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        lesson.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET"])
def list_lessons(request):
    lessons = Lesson.objects.all()
    serializer = LessonSerializer(lessons, many=True)
    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


@api_view(["GET"])
def lessons_today(request):
    time_now = datetime.now()
    todays_day = time_now.strftime("%A").lower()

    lessons = (
        Lesson.objects.filter(day=todays_day).select_related("student").order_by("time")
    )
    serializer = LessonSerializer(
        lessons, many=True
    )  # Pass the queryset, not the model class

    return Response(serializer.data)


@api_view(["GET"])
def lessons_weekly(request):
    lessons = Lesson.objects.all().select_related("student")

    serializer = LessonSerializer(
        lessons, many=True
    )  # Pass the queryset, not the model class

    return Response(serializer.data)
