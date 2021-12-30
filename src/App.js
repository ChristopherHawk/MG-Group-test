
import React from 'react';
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import './App.css';
import NavBar from "./components/navbar";
import ModalInfo from "./components/modal";
import FormSignUp from "./views/formSignUp";
//Views
import Home from './views/home';
import UserDetails from './views/userDetails';

function App() {

  return (
    <>
      {/*  NavBar  */}
      <NavBar />
      {/* Routes */}
      <Container id='divMaster'>
        <ModalInfo/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<FormSignUp />} />
          <Route path="/userDetails" element={<UserDetails />} />
        </Routes>
      </Container>
    </>

  );
}

export default App;
