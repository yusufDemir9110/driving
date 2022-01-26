import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/Navi.css";
import { collection, onSnapshot } from "firebase/firestore";

import db from "../firebase/firebase";

function Navi() {
  const [topics, setTopics] = useState([]);
  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "topics-data"), (snapshot) =>
      setTopics(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    onSnapshot(collection(db, "exercises-data"), (snapshot) =>
      setExercises(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  return (
    <nav className="rowSpaceBetween">
      <div class="logo rowCenter">
        <div></div>
      </div>
      <div class="menuMainItems">
        <ul class="mainUl">
          <li class="menuSubItems">
            Topics
            <ul class="subUl">
              {topics.map(({ id, data }) => (
                <Link to={"/lp"} state={{ state: data.name }}>
                  <li key={id}>{data.name}</li>
                </Link>
              ))}
            </ul>
          </li>
          <li class="menuSubItems">
            Exercises
            <ul class="subUl">
              {exercises.map(({ id, data }) => (
                <Link to={"/ep"} state={{ state: data.name }}>
                  <li key={id}>{data.name}</li>
                </Link>
              ))}
            </ul>
          </li>
          <li class="menuSubItems">
            Languages
            <ul class="subUl">
              <Link to="/">
                <li>English</li>
              </Link>
              <Link to="/Du">
                <li>Dutch</li>
              </Link>
              <Link to="/Tr">
                <li>Turkish</li>
              </Link>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navi;
