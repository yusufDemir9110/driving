import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './admin/loginPages/Login';
import Home from './pages/Home'
import Navi from './components/Navi'
import { Container } from 'reactstrap';
import HomeDutch from './pages/HomeDutch';
import HomeTurkish from './pages/HomeTurkish';
import LessonPage from './pages/LessonPage';

class App extends Component {
  render() {
    return (
      <Container>
        <Navi />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/Du' element={<HomeDutch />} />
          <Route exact path='/Tr' element={<HomeTurkish />} />
          <Route exact path='/admin5874' element={<Login />} />
          <Route exact path='/lp' element={<LessonPage />} />
        </Routes>
      </Container>



    )
  }
}

export default App;