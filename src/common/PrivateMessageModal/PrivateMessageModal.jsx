import React, { useEffect, useState } from "react";
import './PrivateMessageModal.css'
import { Button, Modal, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userData } from "../../pages/userSlice";
import { sendMessage } from "../../services/apiCalls";

export const PrivateMessageModal = ({
  showModalUserData,
  handleCloseModalUserData,
  selectedUser
}) => {

  const rdxUserData = useSelector(userData)
  const [messageData, setMessageData] = useState({
    recipient_id: selectedUser.user_id,
    description: '',
  })

  const inputHandlerFunction = (e) => {
    setMessageData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendMessageFunction = () => {
    sendMessage(rdxUserData.credentials,messageData)
    .then(() => handleCloseModalUserData())
    .catch((err)=> console.error(err))
  };

  return (
    <Modal show={showModalUserData} onHide={handleCloseModalUserData}>
      <Modal.Header closeButton>
        <Modal.Title>Private messages</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Message to {selectedUser.name}</Form.Label>
            <Form.Control
              className="privateMessage"
              type="text"
              as={"textarea"}
              placeholder={"write here your message..."}
              name={"description"}
              rows={5}
              onChange={(e) => inputHandlerFunction(e)}
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModalUserData}>
          Close
        </Button>
        <Button variant="primary" onClick={() => sendMessageFunction()}>
          Send Message
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
