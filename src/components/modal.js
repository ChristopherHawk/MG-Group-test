import React, {useContext} from 'react';
import UserContext from '../context/UserData/userContext';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
 
const ModalMessage = () => {
  const navigate = useNavigate();
  const {modalStatus, openModal, infoModal, errorsBox, clearErrors} = useContext(UserContext);
  
  return ( 
    <Modal show={modalStatus} onHide={openModal} animation={false}>
    <Modal.Header closeButton>
      {!errorsBox &&<Modal.Title>Nuevo usuario creado</Modal.Title>}
      {errorsBox &&<Modal.Title><b>Campo: </b>{errorsBox.field}</Modal.Title>}
    </Modal.Header>
    {!errorsBox && <Modal.Body>
    <i className="fa fa-user-circle" /> <b>Nombre:</b> {infoModal.name}<br/>
    <i className="fa fa-venus-mars" /> <b>Género:</b> {infoModal.gender}<br/>
    <i className="fa fa-envelope" /> <b>Correo:</b> {infoModal.email}<br/>
    <i className="fa fa-toggle-on" /> <b>Estado:</b> {infoModal.status}<br/>
    </Modal.Body>}
    {errorsBox &&
    <>
    <Modal.Body>
    <i className="fa fa-point" /> <b>Mensaje:</b> {errorsBox.message}<br/>    
    </Modal.Body>
    
    <Modal.Footer>
      <Button variant="success" onClick={() => {openModal(false); clearErrors(); }}>
        De acuerdo!
      </Button>
    </Modal.Footer>
    </>}
    {!errorsBox &&<Modal.Footer>
      <Button variant="success" onClick={() => {openModal(false); clearErrors(); navigate('/');}}>
        De acuerdo!
      </Button>
    </Modal.Footer>}
  </Modal>
   );
}
 
export default ModalMessage;