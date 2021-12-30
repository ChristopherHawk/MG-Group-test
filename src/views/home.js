/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { Container, Card } from 'react-bootstrap';
import UserContext from '../context/UserData/userContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { getAllUsers, users, showDetailsUser} = useContext(UserContext);

 
  useEffect(() => {
    getAllUsers()
  }, [])
  return (
    <Container id='Container'>
      {users.map(item => (
        <Card key={item.id} onClick={() => {navigate('/userDetails'); showDetailsUser(item)}} id='cardUser'>
          <Card.Body>
            <Card.Title><i className="fa fa-user-circle" /> {item.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted"><i className="fa fa-toggle-on" style={{color:item.status === 'inactive'?'#957665':'#087FA9'}}/> <b style={{color:'black'}}>Estado:</b>{' '}{item.status}</Card.Subtitle>
            <Card.Text>
              <i className="fa fa-venus-mars" /> <b>Género:</b>{' '}{item.gender}
            </Card.Text>
            <Card.Link href="#"><i className="fa fa-envelope" /> {item.email}</Card.Link>
          </Card.Body>
        </Card>))}
    </Container>);
}

export default Home;