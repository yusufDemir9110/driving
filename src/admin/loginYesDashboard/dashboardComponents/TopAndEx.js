import React, { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import db, { storage } from "../../../firebase/firebase";
import "../../../styles/Admin.css";

function TopAndEx({ language }) {
  const [topic, setTopic] = useState({
    id: "",
    name: "",
    image: "",
    description1: "",
    description2: "",
    description3: "",
    description4: "",
  });
  const [topOrEx, setTopOrEx] = useState("topic");
  const [progres, setProgres] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [disabled, setDisabled] = useState(true);

  function handleChange(e) {
    topic[e.target.id] = e.target.value;
    setTopic({ ...topic, topic });
    if (
      topic.id !== "" &&
      topic.name !== "" &&
      imageUrl !== "" &&
      topic.description1 !== ""
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  function chooseTopOrEx(e) {
    const selectedTopOrEx = e.target.value;
    setTopOrEx(selectedTopOrEx);
  }

  const imageHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    const storageRef = ref(storage, `/topAndEx/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

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
    switch (language) {
      case "English":
        if (topOrEx === "topic") {
          await setDoc(doc(db, "topics-data", topic.id), {
            name: topic.name,
            image: imageUrl,
            description1: topic.description1,
            description2: topic.description2,
            description3: topic.description3,
            description4: topic.description4,
          });
        } else {
          await setDoc(doc(db, "exercises-data", topic.id), {
            name: topic.name,
            image: imageUrl,
            description1: topic.description1,
            description2: topic.description2,
            description3: topic.description3,
            description4: topic.description4,
          });
        }
        break;
      case "Dutch":
        if (topOrEx === "topic") {
          await setDoc(doc(db, "topics-data-Dutch", topic.id), {
            name: topic.name,
            image: imageUrl,
            description1: topic.description1,
            description2: topic.description2,
            description3: topic.description3,
            description4: topic.description4,
          });
        } else {
          await setDoc(doc(db, "exercises-data-Dutch", topic.id), {
            name: topic.name,
            image: imageUrl,
            description1: topic.description1,
            description2: topic.description2,
            description3: topic.description3,
            description4: topic.description4,
          });
        }
        break;
      case "Turkish":
        if (topOrEx === "topic") {
          await setDoc(doc(db, "topics-data-Turkish", topic.id), {
            name: topic.name,
            image: imageUrl,
            description1: topic.description1,
            description2: topic.description2,
            description3: topic.description3,
            description4: topic.description4,
          });
        } else {
          await setDoc(doc(db, "exercises-data-Turkish", topic.id), {
            name: topic.name,
            image: imageUrl,
            description1: topic.description1,
            description2: topic.description2,
            description3: topic.description3,
            description4: topic.description4,
          });
        }
        break;
    }
    setTopic({
      id: "",
      name: "",
      image: "",
      description1: "",
      description2: "",
      description3: "",
      description4: "",
    });
    setImageUrl("");
    setDisabled(true);
    setProgres(0);
  };
  return (
    <div className="bigContainer">
      <div className="selectTopOrEx">
        <select
          id="toporex"
          size="2"
          onChange={(e) => chooseTopOrEx(e)}
          value={topOrEx}
        >
          <option id="topic" value="topic">
            Topic
          </option>
          <option id="exercise" value="exercise">
            Exercise
          </option>
        </select>
        <h3>
          topic or exercise:<strong>{topOrEx}</strong>
        </h3>
      </div>

      <div className="topicImageLoader">
        <form onSubmit={imageHandler}>
          <input type="file"></input>
          <button type="submit">Upload</button>
        </form>
        <h2>Uploaded {progres} %</h2>
      </div>
      <div className="topAndEx">
        <div>
          <label for="id">
            Topic Id
            <input
              required
              type="text"
              id="id"
              value={topic.id}
              onChange={handleChange}
              placeholder="Topic Id"
            ></input>
          </label>
        </div>
        <div>
          <label for="name">
            Topic Names
            <input
              required
              type="text"
              id="name"
              value={topic.name}
              onChange={handleChange}
              placeholder="Topic Name"
            ></input>
          </label>
          <label for="image">
            Topic Image
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
          <label for="description1">
            Description1
            <input
              required
              type="textarea"
              id="description1"
              value={topic.description1}
              onChange={handleChange}
              placeholder="desc1"
            ></input>
          </label>
          <label for="description2">
            Description2
            <input
              required
              type="textarea"
              id="description2"
              value={topic.description2}
              onChange={handleChange}
              placeholder="desc2"
            ></input>
          </label>
        </div>
        <div>
          <label for="description3">
            Description3
            <input
              required
              type="textarea"
              id="description3"
              value={topic.description3}
              onChange={handleChange}
              placeholder="desc3"
            ></input>
          </label>
          <label for="description4">
            Description4
            <input
              required
              type="textarea"
              id="description4"
              value={topic.description4}
              onChange={handleChange}
              placeholder="desc4"
            ></input>
          </label>
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

export default TopAndEx;
