import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom';
import Login from './admin/Login';
import Home from './pages/Home'
import Navi from './components/Navi'
import { Container } from 'reactstrap';
import HomeDutch from './pages/HomeDutch';
import HomeTurkish from './pages/HomeTurkish';

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
        </Routes>
      </Container>



    )
  }
}

export default App;