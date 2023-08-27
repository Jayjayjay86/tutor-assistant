import React, { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";

const TimeTableWeek = ({ useCustomNavigation }) => {
  const [weeklylessons, setWeeklyLessons] = useState([]);
  const { goToMenu } = useCustomNavigation();
  const [selectedSubject, setSelectedSubject] = useState("grammar");
  const componentRef = useRef(null);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const fetchLessonsWeekly = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/lessons-weekly", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWeeklyLessons(data);
      } else {
        console.error(
          "Error fetching lessons:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  useEffect(() => {
    fetchLessonsWeekly();
  }, []);

  const filteredLessons =
    selectedSubject === "all"
      ? weeklylessons
      : weeklylessons.filter(
          (lesson) =>
            lesson.subject.toLowerCase() === selectedSubject.toLowerCase()
        );

  const groupLessonsByDay = () => {
    // Create an object to store lessons grouped by day
    const groupedLessons = {};

    // Loop through each lesson and group them by day
    filteredLessons.forEach((lesson) => {
      const day = lesson.day;
      if (!groupedLessons[day]) {
        groupedLessons[day] = [];
      }
      groupedLessons[day].push(lesson);
    });

    return groupedLessons;
  };

  const groupedLessons = groupLessonsByDay();

  return (
    <div className="weekly-timetable">
      <div className="print-button-container">
        <ReactToPrint
          trigger={() => <button>Print</button>}
          content={() => componentRef.current}
        />
      </div>
      <div className="subject-filter">
        <label htmlFor="subjectSelect">Select Subject:</label>
        <select
          id="subjectSelect"
          value={selectedSubject}
          onChange={handleSubjectChange}
        >
          <option value="all">All Subjects</option>
          <option value="grammar">Grammar</option>
          <option value="native">Native</option>
        </select>
      </div>

      <div className="weekly-lesson-table" ref={componentRef}>
        {Object.keys(groupedLessons).map((day) => (
          <div className="weekly-lessons" key={day}>
            <strong className="weekly-lessons-header">{day}:</strong>
            <table className="weekly-lessons-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {groupedLessons[day].map((lesson) => (
                  <tr key={lesson.id}>
                    <td>{lesson.student.name}</td>
                    <td>{lesson.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <div className="back-button-container">
        <button onClick={goToMenu}>Back to Menu</button>
      </div>
    </div>
  );
};

export default TimeTableWeek;
