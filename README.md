# Tutor Assistant App

The Tutor Assistant App is a web application designed to streamline lesson scheduling and management for private tutors. It allows tutors to easily manage their students' lesson times and days, as well as view weekly and daily timetables. The app provides CRUD (Create, Read, Update, Delete) capabilities for lesson data and supports printing timetables to local printers. The backend is built with Django, and the frontend is developed using React.

## Features

- Create, update, and delete student lesson records.
- Display weekly and daily timetables for tutors.
- Print timetables to local printers.
- User-friendly interface for easy interaction.

## Technologies Used

- Django: Backend web framework for handling data storage and business logic.
- Django Rest Framework: Toolkit for building Web APIs in Django.
- React: Frontend JavaScript library for building user interfaces.
- HTML, CSS: For structuring and styling the user interface.
- SQLite: Database used for storing lesson data.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jayjayjay86/tutor-assistant-app.git
   cd tutor-assistant-app
   ```

2. Set up the backend:

   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

   The backend server should now be running at `http://localhost:8000`.

3. Set up the frontend:

   ```bash
   cd frontend
   npm install
   npm start
   ```

   The frontend development server should now be running at `http://localhost:3000`.

4. Access the app:

   Open a web browser and navigate to `http://localhost:3000` to use the Tutor Assistant App.

## Usage

- Sign up or log in as a tutor.
- Add students and their lesson details.
- View weekly and daily timetables to manage lessons effectively.
- Print timetables for easy reference.


## Contributing

Contributions to the Tutor Assistant App are welcome! Feel free to open issues and submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the Django and React communities for their amazing tools and resources.

---

Please make sure to replace placeholders such as `your-username` and add actual screenshots to enhance the README's visual appeal and provide a clear understanding of your app's functionality.