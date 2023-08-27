import { useState, useEffect, React } from "react";
import { useNavigate, Route, Routes, useLocation } from "react-router-dom";
import "./app.css";
import Menu from "./Menu";
import StudentList from "./student_components/StudentList";
import StudentCreate from "./student_components/StudentCreate";
import LessonCreate from "./lesson_components/LessonCreate";
import TimeTableToday from "./lesson_components/TimeTableToday";
import TimeTableWeek from "./lesson_components/TimetableWeek";

function App() {
  const currentDate = new Date();
  const dayOfWeek = currentDate.toLocaleString("en-US", { weekday: "long" });
  const [students, setStudents] = useState([]);
  const [lessons, setLessons] = useState([]);
  const location = useLocation();
  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/all-students/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        console.error(
          "Error fetching students:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  const fetchLessons = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/all-lessons/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLessons(data);
      } else {
        console.error(
          "Error fetching students:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []); // Empty dependency array ensures this effect runs only once on mount
  useEffect(() => {
    fetchLessons();
  }, []);
  const useCustomNavigation = () => {
    const navigate = useNavigate();
    const goToMenu = () => {
      navigate("/");
    };

    return { goToMenu };
  };
  const getFooterContent = () => {
    if (location.pathname === "/student-list") {
      return `${students.length} Students  - ${lessons.length} Lessons`;
    } else if (location.pathname === "/weekly-timetable") {
      return `${lessons.length} weekly lessons`;
    } else if (location.pathname === "/today-timetable") {
      return `${dayOfWeek}`;
    } else {
      // Fallback for other pages
      return "Please select an option";
    }
  };
  return (
    <div className="App">
      <header>
        <a href="/tutorland/" className="logo">
          Tutorland<span> - We love it, when you do!</span>
        </a>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route
            path="/student-list"
            element={
              <StudentList
                students={students}
                setstudents={setStudents}
                fetchStudents={fetchStudents}
                useCustomNavigation={useCustomNavigation}
              />
            }
          />
          <Route
            path="/today-timetable"
            element={
              <TimeTableToday useCustomNavigation={useCustomNavigation} />
            }
          />
          <Route
            path="/weekly-timetable"
            element={
              <TimeTableWeek
                lessons={lessons}
                setlessons={setLessons}
                useCustomNavigation={useCustomNavigation}
              />
            }
          />
          <Route
            path="/create-student"
            element={
              <StudentCreate
                useCustomNavigation={useCustomNavigation}
                listOfStudents={students}
              />
            }
          />
          <Route
            path="/create-lesson"
            element={
              <LessonCreate
                useCustomNavigation={useCustomNavigation}
                listOfLessons={lessons}
              />
            }
          />
        </Routes>
      </main>
      <footer>{getFooterContent()}</footer>
    </div>
  );
}

export default App;
