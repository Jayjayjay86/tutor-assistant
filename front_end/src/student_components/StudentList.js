import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { HiOutlineUserRemove } from "react-icons/hi";
import { LiaUserEditSolid } from "react-icons/lia";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactToPrint from "react-to-print"; // Import the react-to-print library

const StudentList = ({ useCustomNavigation, fetchStudents, students }) => {
  const { goToMenu } = useCustomNavigation();
  const [search, setSearch] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const componentRef = useRef(null); // Reference to the student list component
  const [editFormData, setEditFormData] = useState({
    purpose: "",
    amount: 0,
    description: "",
    isIncome: false,
    isMonthly: false,
    isWeekly: false,
    isDebt: false,
    debt_amount: 0,
    date: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      fetchStudentData(selectedStudent.id);
    }
  }, [selectedStudent]);

  const fetchStudentData = async (studentId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/get-student/${studentId}/`
      );
      console.log(studentId);
      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }
      const data = await response.json();
      setEditFormData(data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredstudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenEditModal = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleOpenDeleteModal = (student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await fetch(
        `http://localhost:8000/api/edit-student/${selectedStudent.id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Student deleted.", {
        style: {
          background: "rgb(233, 212, 224)", // Set background color to rgb(233, 212, 224) for success
          color: "#333", // Set font color to a contrasting color (e.g., black)
          borderRadius: "8px", // Set border radius
          border: "1px solid #333", // Add 1px solid border
          width: "90%", // Set the width of the toast
        },
      });
      setIsDeleteModalOpen(false);
      fetchStudents();
    } catch (error) {
      toast.error("Error deleting student.", {
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

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/api/edit-student/${selectedStudent.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editFormData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update student");
      }
      setIsEditModalOpen(false);
      fetchStudents();
      toast.success("Student Saved", {
        style: {
          background: "rgb(233, 212, 224)", // Set background color to rgb(233, 212, 224) for success
          color: "#333", // Set font color to a contrasting color (e.g., black)
          borderRadius: "8px", // Set border radius
          border: "1px solid #333", // Add 1px solid border
          width: "90%", // Set the width of the toast
        },
      });
    } catch (error) {
      toast.error("Error saving student!", {
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
    <div className="list-container">
      <div className="back-button-container">
        <button onClick={goToMenu}>Back to Menu</button>
      </div>
      <div className="print-button-container">
        {/* Use ReactToPrint to wrap the Print button */}
        <ReactToPrint
          trigger={() => <button>Print</button>}
          content={() => componentRef.current} // Reference the student list component
        />
      </div>
      <div className="search-box">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search students..."
        />
      </div>

      <ul className="student-list" ref={componentRef}>
        {filteredstudents.map((student) => (
          <li key={student.id} className="student-item">
            <div className="student-item-name">
              <strong>{student.name}</strong>
            </div>

            <p>Lessons Remaining:</p>

            <table>
              <thead>
                <tr>
                  <th>Grammar</th>
                  <th>Native</th>
                  <th>Both</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{student.lessons_remaining}</td>
                  <td>{student.lessons_remaining_native_only}</td>
                  <td>{student.lessons_remaining_grammar_only}</td>
                </tr>
              </tbody>
            </table>

            <div className="buttons-section">
              <button onClick={() => handleOpenEditModal(student)}>
                <LiaUserEditSolid className="edit" />
              </button>
              <button onClick={() => handleOpenDeleteModal(student)}>
                <HiOutlineUserRemove className="delete" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        className="modal"
        isOpen={isEditModalOpen}
        onRequestClose={handleCloseEditModal}
        contentLabel="Edit student"
        ariaHideApp={false}
      >
        <form className="edit-student" onSubmit={handleSaveEdit}>
          <div className="modal-form-item">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editFormData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="modal-form-item">
            <label htmlFor="lessons_remaining">Lessons Remaining:</label>
            <input
              type="number"
              id="lessons_remaining"
              name="lessons_remaining"
              value={editFormData.lessons_remaining}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="modal-form-item">
            <label htmlFor="lessons_remaining_native_only">
              Native Lessons Remaining:
            </label>
            <input
              type="number"
              id="lessons_remaining_native_only"
              name="lessons_remaining_native_only"
              value={editFormData.lessons_remaining_native_only}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="modal-form-item">
            <label htmlFor="lessons_remaining_grammar_only">
              Grammar Lessons Remaining:
            </label>
            <input
              type="number"
              id="lessons_remaining_grammar_only"
              name="lessons_remaining_grammar_only"
              value={editFormData.lessons_remaining_grammar_only}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="button-container">
            <button type="submit">Save</button>
            <button onClick={handleCloseEditModal}>Cancel</button>
          </div>
        </form>
      </Modal>

      <Modal
        className="modal"
        isOpen={isDeleteModalOpen}
        onRequestClose={handleCloseDeleteModal}
        contentLabel="Confirm Delete"
        ariaHideApp={false}
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this student?</p>
        <div className="button-container">
          <button onClick={handleDelete}>Yes</button>
          <button onClick={handleCloseDeleteModal}>No</button>
        </div>
      </Modal>
      <ToastContainer position="bottom-center" toastStyle={{ zIndex: 9999 }} />
    </div>
  );
};

export default StudentList;
