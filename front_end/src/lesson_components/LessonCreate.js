import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LessonCreate = ({ listOfLessons, useCustomNavigation }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedLessons, setSelectedLessons] = useState([]);
  const [is_online, setIs_online] = useState(false);
  const [grammarDay, setGrammarDay] = useState("");
  const [nativeDay, setNativeDay] = useState("");
  const [showGrammarTime, setShowGrammarTime] = useState(false);
  const [showNativeTime, setShowNativeTime] = useState(false);
  const [grammarTime, setGrammarTime] = useState("");
  const [nativeTime, setNativeTime] = useState("");
  const { goToMenu } = useCustomNavigation();
  useEffect(() => {
    // Fetch the list of students from localhost:8000/students/
    fetch("http://localhost:8000/api/all-students/")
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  const handleLessonTypeChange = (e) => {
    setSelectedLessons(
      Array.from(e.target.selectedOptions, (option) => option.value)
    );
    setShowGrammarTime(
      e.target.value === "grammar" || e.target.value === "both"
    );
    setShowNativeTime(e.target.value === "native" || e.target.value === "both");
  };

  const handleOnlineChange = (e) => {
    setIs_online(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      student: selectedStudent,
      grammarDay: showGrammarTime ? grammarDay : null,
      grammarTime: showGrammarTime ? grammarTime : null,
      nativeDay: showNativeTime ? nativeDay : null,
      nativeTime: showNativeTime ? nativeTime : null,
      is_online: is_online,
    };

    // Check if a lesson with the same student, day, and time already exists
    const duplicateLesson = listOfLessons.find(
      (lesson) =>
        lesson.student === selectedStudent &&
        ((!showGrammarTime &&
          lesson.day === nativeDay &&
          lesson.time === nativeTime) ||
          (!showNativeTime &&
            lesson.day === grammarDay &&
            lesson.time === grammarTime) ||
          (showGrammarTime &&
            showNativeTime &&
            (lesson.day === grammarDay || lesson.day === nativeDay) &&
            lesson.time === grammarTime))
    );

    if (duplicateLesson) {
      // Notify the user that a lesson with the same student, day, and time already exists
      toast.error(
        "A lesson with the same student, day, and time already exists. Please choose a different day or time.",
        {
          style: {
            background: "rgb(233, 212, 224)", // Set background color to rgb(233, 212, 224) for error
            color: "#333", // Set font color to a contrasting color (e.g., black)
            borderRadius: "8px", // Set border radius
            border: "1px solid #333", // Add 1px solid border
            width: "320px", // Set the width of the toast
          },
        }
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/create-lesson/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Lesson created successfully!", {
          style: {
            background: "rgb(233, 212, 224)", // Set background color to rgb(233, 212, 224) for success
            color: "#333", // Set font color to a contrasting color (e.g., black)
            borderRadius: "8px", // Set border radius
            border: "1px solid #333", // Add 1px solid border
            width: "90%", // Set the width of the toast
          },
        });
      } else {
        console.error(
          "Error creating lesson:",
          response.status,
          response.statusText
        );
        toast.error("Error creating lesson, Please Try Again Later.", {
          style: {
            background: "rgb(233, 212, 224)", // Set background color to rgb(233, 212, 224) for error
            color: "#333", // Set font color to a contrasting color (e.g., black)
            borderRadius: "8px", // Set border radius
            border: "1px solid #333", // Add 1px solid border
            width: "320px", // Set the width of the toast
          },
        });
      }
    } catch (error) {
      toast.error("Error creating lesson, Please Try Again Later.", {
        style: {
          background: "rgb(233, 212, 224)", // Set background color to rgb(233, 212, 224) for error
          color: "#333", // Set font color to a contrasting color (e.g., black)
          borderRadius: "8px", // Set border radius
          border: "1px solid #333", // Add 1px solid border
          width: "320px", // Set the width of the toast
        },
      });
    }
  };

  return (
    <div className="create-lesson">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="studentSelect">Select Student:</label>
          <select
            id="studentSelect"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="lessonSelect">Select Lessons:</label>
          <select
            id="lessonSelect"
            multiple
            value={selectedLessons}
            onChange={handleLessonTypeChange}
          >
            <option value="native">Native</option>
            <option value="grammar">Grammar</option>
            <option value="both">Both</option>
          </select>
        </div>
        {showGrammarTime && (
          <div className="create-lesson-grammar-day">
            <label htmlFor="grammarDay">Grammar Lesson:</label>
            <select
              id="grammarDay"
              value={grammarDay}
              onChange={(e) => setGrammarDay(e.target.value)}
            >
              <option value="">Select a day</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              {/* Add more options for other days if needed */}
            </select>
            <label htmlFor="grammarTime">Time:</label>
            <input
              className="create-lesson-time"
              type="time"
              id="grammarTime"
              value={grammarTime}
              onChange={(e) => setGrammarTime(e.target.value)}
            />
          </div>
        )}
        {showNativeTime && (
          <div className="create-lesson-native-day">
            <label htmlFor="nativeDay">Native Lesson:</label>
            <select
              id="nativeDay"
              value={nativeDay}
              onChange={(e) => setNativeDay(e.target.value)}
            >
              <option value="">Select a day</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              {/* Add more options for other days if needed */}
            </select>
            <label htmlFor="nativeTime">Time:</label>
            <input
              className="create-lesson-time"
              type="time"
              id="nativeTime"
              value={nativeTime}
              onChange={(e) => setNativeTime(e.target.value)}
            />
          </div>
        )}
        <div className="create-lesson-checkbox">
          <label>
            Online Lesson:
            <input
              type="checkbox"
              checked={is_online}
              onChange={handleOnlineChange}
            />
          </label>
        </div>
        <button type="submit">Create Lesson</button>
      </form>
      <div className="back-button-container">
        <button onClick={goToMenu}>Back to Menu</button>
      </div>
      <ToastContainer position="bottom-center" toastStyle={{ zIndex: 9999 }} />
    </div>
  );
};

export default LessonCreate;
