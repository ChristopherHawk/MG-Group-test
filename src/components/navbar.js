import React from 'react';
import { Navbar, Container, Nav} from 'react-bootstrap';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
 

const NavBar = () => {

  const navigate = useNavigate();
  return ( 
   
    <Navbar bg='dark' variant='dark' fixed="top">
      <Container>
        <Navbar.Brand onClick={() => {navigate('/');}} href='#home'>
          <img
            id='logo'
            alt='Logo'
            src={Logo}
            width='30'
            height='30'
          />{' '}
        <b id='titleNav'>User Test:</b> By Néstor Barraza Otalvarez
        </Navbar.Brand>
        <Nav>
      <Nav.Link onClick={() => navigate('/')}><i className="fa fa-home" /> Inicio</Nav.Link>
      <Nav.Link style={{color:'green'}} onClick={() => navigate('/signUp')}><i className="fa fa-user-plus" /> Crear usuario</Nav.Link>
    </Nav>
      </Container>
    </Navbar>
   );
}
 
export default NavBar;