import React, { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import db, { storage } from "../../../firebase/firebase";
import "../../../styles/Admin.css";

function Exercises({ language }) {
  const [exercise, setExercise] = useState({
    id: "",
    topic: "",
    question: "",
    image: "",
    rightOption: "",
    wrongOptions: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [progres, setProgres] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  function handleChange(e) {
    exercise[e.target.id] = e.target.value;
    setExercise({ ...exercise, exercise });

    if (exercise.id !== "" && exercise.question !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  const imageHandler = (e) => {
    e.preventDefault();
    const image = e.target[0].files[0];
    uploadImages(image);
  };

  const uploadImages = (image) => {
    const storageRefLes = ref(storage, `/lesAndEx/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRefLes, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgres(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) =>
          setImageUrl(url, imageUrl)
        );
      }
    );
  };

  const add = async (event) => {
    event.preventDefault();
    const newExercise = exercise.topic;

    switch (language) {
      case "English":
        await setDoc(doc(db, "exercises-data-" + newExercise, exercise.id), {
          image: imageUrl,
          question: exercise.question,
          rightOption: exercise.rightOption,
          wrongOptions: exercise.wrongOptions,
        });

        break;
      case "Dutch":
        await setDoc(
          doc(db, "exercises-data-Dutch-" + newExercise, exercise.id),
          {
            image: imageUrl,
            question: exercise.question,
            rightOption: exercise.rightOption,
            wrongOptions: exercise.wrongOptions,
          }
        );

        break;
      case "Turkish":
        await setDoc(
          doc(db, "exercises-data-Turkish-" + newExercise, exercise.id),
          {
            image: imageUrl,
            question: exercise.question,
            rightOption: exercise.rightOption,
            wrongOptions: exercise.wrongOptions,
          }
        );

        break;
    }
    setExercise({
      id: "",
      topic: "",
      image: "",
      question: "",
      rightOption: "",
      wrongOptions: "",
    });
    setImageUrl("");
    setDisabled(true);
    setProgres(0);
  };

  return (
    <div className="bigContainer">
      <h1>Exercises</h1>
      <h2>Language: {language}</h2>

      <div>
        <div className="topicImageLoader">
          <form onSubmit={imageHandler}>
            <input type="file"></input>
            <button type="submit">Upload</button>
          </form>
          <h2>Uploaded {progres} %</h2>
        </div>
        <div className="topAndExLabels">
          <div>
            <label for="id">
              Question Id
              <input
                required
                type="text"
                id="id"
                value={exercise.id}
                onChange={handleChange}
                placeholder="Id"
              ></input>
            </label>
            <label for="topic">
              Question Topic
              <input
                required
                type="text"
                id="topic"
                value={exercise.topic}
                onChange={handleChange}
                placeholder="Write Exactly"
              ></input>
            </label>

            <label for="image">
              Question Image
              <input
                required
                disabled
                type="url"
                id="image"
                value={imageUrl}
                onChange={handleChange}
                placeholder="imageUrl"
              ></input>
            </label>
          </div>
          <div>
            <div>
              <div className="textAreaArea">Question</div>
              <textarea
                className="textAreaArea"
                required
                id="question"
                rows="3"
                value={exercise.question}
                onChange={handleChange}
                placeholder="Question"
              ></textarea>
            </div>
          </div>
          <div>
            <div className="textAreaArea">Right Option</div>
            <textarea
              required
              className="textAreaArea"
              type="text"
              id="rightOption"
              value={exercise.rightOption}
              onChange={handleChange}
              placeholder="ro"
            ></textarea>

            <div className="textAreaArea">Wrong Options</div>
            <textarea
              required
              className="textAreaArea"
              type="text"
              id="wrongOptions"
              value={exercise.wrongOptions}
              onChange={handleChange}
              placeholder="wo1,wo2,wo3"
            ></textarea>
          </div>
        </div>
        <div className="topAddButtonCont">
          <button disabled={disabled} onClick={add}>
            ekle
          </button>
        </div>
      </div>
    </div>
  );
}

export default Exercises;
