import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentCreate = ({ listOfStudents, useCustomNavigation }) => {
  const [name, setName] = useState("");
  const [lessons_remaining, setRemainingLessons] = useState(0);
  const [lessons_remaining_native_only, setNativeLessons] = useState(0);
  const [lessons_remaining_grammar_only, setGrammarLessons] = useState(0);
  const { goToMenu } = useCustomNavigation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if a student with the same name already exists
      const existingStudent = listOfStudents.find(
        (student) => student.name.toLowerCase() === name.toLowerCase()
      );

      if (existingStudent) {
        toast.error("A student with the same name already exists.", {
          style: {
            background: "rgb(233, 212, 224)", // Set background color to rgb(233, 212, 224) for error
            color: "#333", // Set font color to a contrasting color (e.g., black)
            borderRadius: "8px", // Set border radius
            border: "1px solid #333", // Add 1px solid border
            width: "320px", // Set the width of the toast
          },
        });
        return;
      }

      const response = await fetch(
        "http://localhost:8000/api/create-student/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            lessons_remaining,
            lessons_remaining_native_only,
            lessons_remaining_grammar_only,
          }),
        }
      );

      if (response.ok) {
        // Student created successfully
        toast.success("Student created successfully!", {
          style: {
            background: "rgb(233, 212, 224)", // Set background color to rgb(233, 212, 224) for success
            color: "#333", // Set font color to a contrasting color (e.g., black)
            borderRadius: "8px", // Set border radius
            border: "1px solid #333", // Add 1px solid border
            width: "90%", // Set the width of the toast
          },
        });
        // Optionally, you can reset the form fields after successful creation
        setName("");
        setRemainingLessons(0);
        setNativeLessons(0);
        setGrammarLessons(0);
      } else {
        toast.error("Error creating student. Please try again later.", {
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
      toast.error("Error creating student. Please try again later.", {
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
    <div className="create-student">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            required
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lessons_remaining_native_only">
            Native Only Lessons Remaining:
          </label>
          <input
            type="number"
            id="lessons_remaining_native_only"
            value={lessons_remaining_native_only}
            onChange={(e) => setNativeLessons(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lessons_remaining_grammar_only">
            Grammar Only Lessons Remaining:
          </label>
          <input
            type="number"
            id="lessons_remaining_grammar_only"
            value={lessons_remaining_grammar_only}
            onChange={(e) => setGrammarLessons(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="remainingLessons">Remaining Lessons:</label>
          <input
            type="number"
            id="lessons_remaining"
            value={lessons_remaining}
            onChange={(e) => setRemainingLessons(e.target.value)}
          />
        </div>
        <button type="submit">Create Student</button>
      </form>
      <div className="back-button-container">
        <button onClick={goToMenu}>Back to Menu</button>
      </div>
      <div className="toast-wrapper">
        <ToastContainer
          position="bottom-center" // Position the toast container at the bottom center of the screen
          toastStyle={{ zIndex: 9999 }} // Set the z-index to ensure it appears on top of other content
        />
      </div>
    </div>
  );
};

export default StudentCreate;
