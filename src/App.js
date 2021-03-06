import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./admin/loginPages/Login";
import Home from "./pages/Home";

import { Container } from "reactstrap";
import HomeDutch from "./pages/HomeDutch";
import HomeTurkish from "./pages/HomeTurkish";
import LessonPage from "./pages/LessonPage";
import ExercisePage from "./pages/ExercisePage";
import ExercisePageFinal from "./pages/ExercisePageFinal";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Du" element={<HomeDutch />} />
          <Route exact path="/Tr" element={<HomeTurkish />} />
          <Route exact path="/admin5874" element={<Login />} />
          <Route exact path="/lp" element={<LessonPage />} />
          <Route exact path="/ep" element={<ExercisePage />} />
          <Route exact path="/finalscore" element={<ExercisePageFinal />} />
        </Routes>
      </div>
    );
  }
}

export default App;
