import React, { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";

const TimeTableToday = ({ useCustomNavigation }) => {
  const [todaysLessons, setTodaysLessons] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("grammar");
  const { goToMenu } = useCustomNavigation();
  const componentRef = useRef(null); // Reference to the component to be printed

  useEffect(() => {
    const fetchLessonsToday = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/lessons-today/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setTodaysLessons(data);
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

    fetchLessonsToday();
  }, []);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const filteredLessons =
    selectedSubject === "all"
      ? todaysLessons
      : todaysLessons.filter(
          (lesson) =>
            lesson.subject.toLowerCase() === selectedSubject.toLowerCase()
        );

  return (
    <div className="todays-timetable">
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
      <div className="daily-lesson-table" ref={componentRef}>
        {filteredLessons.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredLessons.map((lesson) => (
                <tr key={lesson.id}>
                  <td>{lesson.student.name}</td>
                  <td>{lesson.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No lessons found for the selected subject.</p>
        )}
      </div>
      <div className="back-button-container">
        <button onClick={goToMenu}>Back to Menu</button>
      </div>
    </div>
  );
};

export default TimeTableToday;
