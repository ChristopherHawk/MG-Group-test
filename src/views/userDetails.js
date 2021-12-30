import React, { useState, useContext, useEffect } from 'react';
import { Card, Container, Form, Button, ButtonGroup, ToggleButton, Spinner } from "react-bootstrap";
import UserContext from '../context/UserData/userContext';
import { useNavigate } from 'react-router-dom';
const REGEX_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}

const UserDetails = () => {
  const navigate = useNavigate();

  const { userDetails, updateInfoUser, deleteUser } = useContext(UserContext);
  const [userActions, setUserActions] = useState(false);
  const [editFormData, setEditFormData] = useState({
    "name": userDetails.name,
    "gender": userDetails.gender,
    "email": userDetails.email,
    "status": userDetails.status
  })
  const [checked, setChecked] = useState(userDetails.status === 'inactive' ? false : true);
  const [genderValue, setGenderValue] = useState(userDetails.gender === 'male' ? '1' : '2');
  const radios = [
    { name: 'Masculino', value: '1' },
    { name: 'Femenino', value: '2' }
  ];
  const [isLoading, setLoading] = useState(false);
  const disabledBtn = editFormData.name.length < 4 || editFormData.email.length < 4 || !REGEX_EMAIL.test(editFormData.email);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [editFormData, isLoading])
  const handleClick = () => {
    setLoading(true)
    if (isLoading) {
      setLoading(false)
    }
  };

  return (
    <Container id='Container2'>
      <Card id='cardUser2'>
        <Card.Body>
          {!userActions && <Card.Title><i className="fa fa-user-circle" /> {editFormData.name}</Card.Title>}
          {userActions && <Form.Control name='name' onChange={(e) => { setEditFormData({ ...editFormData, name: e.target.value }); }} value={editFormData.name} />}

          {!userActions && <Card.Subtitle className="mb-2 text-muted"><i className="fa fa-toggle-on" style={{color:editFormData.status === 'inactive'?'#957665':'#087FA9'}} /> <b style={{color:'black'}}>Estado:</b>{' '}{editFormData.status}</Card.Subtitle>}
          {userActions && <br />}
          {userActions && <ButtonGroup className="mb-2">
            <ToggleButton
              id="toggle-check"
              type="checkbox"
              variant={checked ? 'dark' : 'secondary'}
              value={checked ? 1 : 0}
              checked={checked}
              onClick={() => setEditFormData({ ...editFormData, status: !checked ? 'active' : 'inactive' })}
              onChange={(e) => { setChecked(e.currentTarget.checked); }}
            >
              {checked ? 'Activo' : 'Inactivo'}
            </ToggleButton>
          </ButtonGroup>}
          {!userActions && <Card.Text>
            <i className="fa fa-venus-mars" /> <b>Género:</b>{' '}{editFormData.gender}
          </Card.Text>}
          {userActions && <br />}
          {userActions && <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? 'outline-info' : 'outline-dark'}
                value={radio.value}
                checked={genderValue === radio.value}
                onClick={() => { setEditFormData({ ...editFormData, gender: radio.value === '1' ? 'male' : 'female' }) }}
                onChange={(e) => { setGenderValue(e.currentTarget.value); }}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>}

          {!userActions && <Card.Link href="#"><i className="fa fa-envelope" /> {editFormData.email}</Card.Link>}
          {userActions && <br />}
          {userActions && <br />}
          {userActions && <Form.Control name='email' onChange={(e) => { setEditFormData({ ...editFormData, email: e.target.value }); }} value={editFormData.email} />}
        </Card.Body>
        <Card.Footer>
          {!userActions && <Button id='btnActions' variant="primary" onClick={() => { setUserActions(true) }}>
            <i className="fa fa-edit" />
          </Button>}
          {userActions &&
            <Button disabled={disabledBtn}
              id='btnActions'
              variant="dark"
              onClick={() => {
                setUserActions(false);
                updateInfoUser(editFormData, userDetails.id);
                setTimeout(() => {
                  navigate('/')
                }, 2000);
              }}>
              <i className="fa fa-save" />
            </Button>}
          {!userActions &&
            <Button
              disabled={isLoading}
              id='btnActions' 
              variant="danger" 
              onClick={() => {
                deleteUser(userDetails); handleClick()
              }}>
                {isLoading &&<Spinner animation="grow" size="sm" />}
              {!isLoading &&<i className="fa fa-times-circle" />}
            </Button>}
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default UserDetails;