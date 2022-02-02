import { collection, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import db from "../firebase/firebase";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import "../styles/LessonPage.css";
import { Link } from "react-router-dom";

function LessonPage() {
  const [lessons, setLessons] = useState([]);
  const [current, setCurrent] = useState(0);
  const length = lessons.length;
  let topicName = useLocation();

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    onSnapshot(
      collection(db, "lessons-data-" + topicName.state.state),
      (snapshot) =>
        setLessons(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
    );
    console.log(topicName.state.state);
  }, []);

  return (
    <div className="slideBody">
      <div className="mainSlide">
        <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
        <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
        {lessons.map(({ id, data }, index) => (
          <div className={index === current ? "data active" : "data"} key={id}>
            {index === current && (
              <div className="slide">
                <div className="dataHeadLesson">{data.head}</div>
                <div className="dataImageLesson">
                  <img src={data.image}></img>
                </div>
                <div className="dataDesc">{data.description}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LessonPage;
