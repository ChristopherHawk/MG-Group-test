/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { Form, Button, ToggleButton, ButtonGroup, Spinner } from 'react-bootstrap';
import UserContext from '../context/UserData/userContext';
export const REGEX_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

function simulateNetworkRequest() {
  return new Promise((resolve) => setTimeout(resolve, 2000));
}


const FormSignUp = () => {
  const { createNewUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    "name": "",
    "gender": "male",
    "email": "",
    "status": "active"
  })
  const [genderValue, setGenderValue] = useState('1');
  const [checked, setChecked] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const radios = [
    { name: 'Masculino', value: '1' },
    { name: 'Femenino', value: '2' }
  ];

  const disabledBtn = formData.name.length < 4 || formData.email.length < 4 || !REGEX_EMAIL.test(formData.email);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }

  }, [genderValue, checked, formData, isLoading])


  const handleClick = () => {
    setLoading(true)
    if (isLoading) {
      setLoading(false)
    }
  };


  return (<>

    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nombre</Form.Label>
        <Form.Control name='name' onChange={(e) => { setFormData({ ...formData, name: e.target.value }); }} placeholder="Ingresa tu nombre" />
        {formData.name.length < 4 && formData.name.length > 0 &&
          <Form.Text className="text-muted">
            <b style={{ color: 'orange' }}>Este campo requiere mínimo 4 caracteres.</b>
          </Form.Text>}
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Género</Form.Label>
        <br />
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? 'outline-info' : 'outline-dark'}
              value={radio.value}
              checked={genderValue === radio.value}
              onClick={() => { setFormData({ ...formData, gender: radio.value === '1' ? 'male' : 'female' }) }}
              onChange={(e) => { setGenderValue(e.currentTarget.value); }}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Correo Electrónico</Form.Label>
        <Form.Control type="email" onChange={(e) => { setFormData({ ...formData, email: e.target.value }); }} placeholder="Ingresa un correo" />
        {formData.email.length < 4 && formData.email.length > 0 && !REGEX_EMAIL.test(formData.email) &&
          <Form.Text className="text-muted">
            <b style={{ color: 'orange' }}>El campo de correo necesita más caracteres.</b>
          </Form.Text>}
        {formData.email.length > 3 && formData.email && !REGEX_EMAIL.test(formData.email) &&
          <Form.Text className="text-muted">
            <b style={{ color: 'red' }}>Ingrese un correo válido.</b>
          </Form.Text>}
        {formData.email.length > 3 && formData.email && REGEX_EMAIL.test(formData.email) &&
          <Form.Text className="text-muted">
            <b style={{ color: 'green' }}>Correo Válido.</b>
          </Form.Text>}

      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Estado</Form.Label>
        <br />
        <ButtonGroup className="mb-2">
          <ToggleButton
            id="toggle-check"
            type="checkbox"
            variant={checked ? 'dark' : 'secondary'}
            value={checked ? 1 : 0}
            checked={checked}
            onClick={() => setFormData({ ...formData, status: !checked ? 'active' : 'inactive' })}
            onChange={(e) => { setChecked(e.currentTarget.checked); }}
          >
            {checked ? 'Activo' : 'Inactivo'}
          </ToggleButton>
        </ButtonGroup>
      </Form.Group>
      {disabledBtn && <Button onClick={() => { createNewUser(formData);  }} size="lg" disabled={disabledBtn} variant="primary">
        Crear Usuario
      </Button>}
      {!disabledBtn && <Button onClick={() => { handleClick(); createNewUser(formData); }} size="lg" disabled={isLoading} variant="primary">
        {isLoading && <Spinner animation="grow" size="sm" />}
        {!isLoading && 'Crear Usuario'}
      </Button>}
    </Form>
  </>
  );
}

export default FormSignUp;