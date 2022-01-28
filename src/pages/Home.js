import { collection, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import db from "../firebase/firebase";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";
import { Col, Row } from "reactstrap";
import Navi from "../components/Navi";
import Footer from "../components/Footer";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";

function Home() {
  const [slides, setSlides] = useState([]);
  const [topics, setTopics] = useState([]);
  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    onSnapshot(collection(db, "Carslider-data"), (snapshot) =>
      setSlides(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
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
    <div>
      <Navi />
      <Carousel
        duration={5000}
        interval={10000}
        indicators={false}
        stopAutoPlayOnHover={false}
      >
        {slides.map(({ data, id }) => (
          <Paper
            key={id}
            className="paper"
            style={{ backgroundImage: "url(" + data.image + ")" }}
          >
            <h2 className="altText">{data.altText}</h2>
            <h4 className="caption">{data.caption}</h4>
          </Paper>
        ))}
      </Carousel>
      <main>
        <h3>
          Prepare for the Netherlands driving test with our free lessons and
          practice exams
        </h3>
        <p>
          In Netherlands, driver's license theory exam consists of 3 parts. If
          you can't get enough correct answers in any part, the exam ends
          automatically.
        </p>
        <ul>
          <li>
            In the first part of 25 questions, they want you to decide what to
            do by looking at a traffic scenario (photo) that appears on the
            screen. The choices are always the same:
            <ol>
              <li>Do nothing</li>
              <li>take your foot off the gas</li>
              <li>do nothing</li>
            </ol>
          </li>
          <li>
            There are 12 questions in the second part. You must get at least 10
            correct.
          </li>
          <li>
            There are 28 questions in the second part. You must get at least 25
            correct.
          </li>
        </ul>
        <p>
          Funny Driving License will be an excellent assistant for you about the
          theory exam. We still strongly recommend you to apply for professional
          courses.
        </p>
      </main>

      <section>
        <h1 id="lessonH1">Lessons</h1>
        <div className="topicCont">
          {topics.map(({ id, data }) => (
            <div
              key={id}
              className="topic"
              style={{ backgroundImage: "url(" + data.image + ")" }}
            >
              <div className="topic_name">{data.name}</div>
              <div className="topic_desc_bg">
                <div className="topic_desc" id="topic_desc_1">
                  {data.description1}
                </div>
                <div className="topic_desc" id="topic_desc_2">
                  {data.description2}
                </div>
                <div className="topic_desc" id="topic_desc_3">
                  {data.description3}
                </div>
                <div className="topic_desc" id="topic_desc_4">
                  {data.description4}
                </div>
                <div className="topic_desc" id="topic_desc_5">
                  <Link to={"/lp"} state={{ state: data.name }}>
                    <button className="buttonTop">Start</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h1 id="exerciseH1">Exercises</h1>
        <div className="topicCont">
          {exercises.map(({ id, data }) => (
            <div
              key={id}
              className="topic"
              style={{ backgroundImage: "url(" + data.image + ")" }}
            >
              <div className="topic_name exercises_bg">{data.name}</div>
              <div className="topic_desc_bg exercises_bg">
                <div className="topic_desc" id="topic_desc_1">
                  {data.description1}
                </div>
                <div className="topic_desc" id="topic_desc_2">
                  {data.description2}
                </div>
                <div className="topic_desc" id="topic_desc_3">
                  {data.description3}
                </div>
                <div className="topic_desc" id="topic_desc_4">
                  {data.description4}
                </div>
                <div className="topic_desc" id="topic_desc_5">
                  <Link to={"/ep"} state={{ state: data.name }}>
                    <button className="buttonEx">Start</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
