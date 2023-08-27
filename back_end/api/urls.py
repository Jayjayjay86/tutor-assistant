from django.urls import path
from .views import (
    list_students,
    list_lessons,
    create_student,
    create_lesson,
    retrieve_lesson,
    retrieve_student,
    update_delete_student,
    update_delete_lesson,
    populate_database,
    lessons_today,
    lessons_weekly,
)

urlpatterns = [
    # path("", populate_database, name="populate-database"),
    # Student URLs
    path("api/all-students/", list_students, name="list-students"),
    path("api/create-student/", create_student, name="create-student"),
    path("api/get-student/<int:pk>/", retrieve_student, name="retrieve-student"),
    path(
        "api/edit-student/<int:pk>/",
        update_delete_student,
        name="update-delete-student",
    ),
    # Lesson URLs
    path("api/all-lessons/", list_lessons, name="lessons"),
    path("api/lessons-today/", lessons_today, name="lessons-today"),
    path("api/lessons-weekly/", lessons_weekly, name="lessons-weekly"),
    path("api/create-lesson/", create_lesson, name="create-lesson"),
    path("api/get-lesson/<int:pk>/", retrieve_lesson, name="retrieve-lesson"),
    path(
        "api/edit-lesson/<int:pk>/", update_delete_lesson, name="update-delete-lesson"
    ),
]
