import React from "react";
import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <div className="menu">
      <ul>
        <Link to="/student-list" className="menu-link">
          <li>
            <strong>Students</strong>
          </li>
        </Link>

        <Link to="/today-timetable" className="menu-link">
          <li>
            <strong>Todays Timetable</strong>
          </li>
        </Link>

        <Link to="/weekly-timetable" className="menu-link">
          <li>
            <strong>Week's Timetable</strong>
          </li>
        </Link>

        <Link to="/create-student" className="menu-link">
          <li>
            <strong>New Student</strong>
          </li>
        </Link>

        <Link to="/create-lesson" className="menu-link">
          <li>
            <strong>New Lesson</strong>
          </li>
        </Link>
        <a href="192.168.1.74:8000" className="menu-link">
          <li>
            <strong>Home</strong>
          </li>
        </a>
      </ul>
    </div>
  );
};

export default Menu;
