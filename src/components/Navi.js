import React, { useEffect, useState } from 'react'
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
  DropdownItem
} from 'reactstrap'
import { Link } from 'react-router-dom'
import '../styles/Navi.css'
import $ from 'jquery';
import { collection, onSnapshot } from 'firebase/firestore';

import db from '../firebase/firebase';









function Navi() {
  const [topics, setTopics] = useState([])
  const [exercises, setExercises] = useState([])
  useEffect(() => {
    onSnapshot(collection(db, 'topics-data'), snapshot =>
      setTopics(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      )
    )
    onSnapshot(collection(db, 'exercises-data'), snapshot =>
      setExercises(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
      )
    )
    $("#li2").mouseenter(function () {
      $("#li2").animate({ paddingRight: "100px" }, 50);
      $(".li2").animate({ left: "80px" }, 250);
      $(".li2").animate({ top: "-22px", paddingBottom: "0" }, 250).delay(250);
    });
    $("#li2").mouseleave(function () {
      $("#li2").animate({ paddingRight: "15px" }, 50);
      $(".li2").animate({ left: "0px", top: "0px", paddingBottom: "15px" }, 50);
    });
    $("#li3").mouseenter(function () {
      $("#li3").animate({ paddingRight: "100px" }, 50);
      $(".li3").animate({ left: "80px" }, 250);
      $(".li3").animate({ top: "-22px", paddingBottom: "0" }, 250).delay(250);
    });
    $("#li3").mouseleave(function () {
      $("#li3").animate({ paddingRight: "20px" }, 50);
      $(".li3").animate({ left: "0px", top: "0px", paddingBottom: "15px" }, 50);
    });
    $("#li4").mouseenter(function () {
      $("#li4").animate({ paddingRight: "100px" }, 50);
      $(".li4").animate({ left: "80px" }, 250);
      $(".li4").animate({ top: "-22px", paddingBottom: "0" }, 250).delay(250);
    });
    $("#li4").mouseleave(function () {
      $("#li4").animate({ paddingRight: "20px" }, 50);
      $(".li4").animate({ left: "0px", top: "0px", paddingBottom: "15px" }, 50);
    });

  }, [])


  return (
    <nav>
      <div id="line">
        <div id="logo" className="d-inline">
          <p>LOGO</p>
        </div>
        <div className="menuItemList d-inline">
          <ul className="ul1">
            <li className="li1" id="li2">Topics
              <ul className="ul2">
                {
                  topics.map(({ id, data }) => (
                    <Link to={'/lp'} state={{ state: data.name }}>
                      <li key={id} className='li2'>{data.name}</li>
                    </Link>
                  ))
                }
              </ul>
            </li>
            <li className="li1" id="li3">Exercises
              <ul className="ul2">
                {
                  exercises.map(({ id, data }) => (
                    <Link to={'/ep'} state={{ state: data.name }}>
                      <li key={id} className='li3'>{data.name}</li>
                    </Link>
                  ))
                }
              </ul>
            </li>
            <li className="li1" id="li4">Language
              <ul className="ul2">
                <Link to='/'><li className="li4" >English</li></Link>
                <Link to='/Du'><li className="li4" >Dutch</li></Link>
                <Link to='/Tr'><li className="li4" >Turkish</li></Link>
              </ul>
            </li>
          </ul>
        </div>

      </div>

    </nav>
  )
}



export default Navi;