import React from "react";
import './PrivateMessageModal.css'
import { Button, Modal, Form } from "react-bootstrap";

export const PrivateMessageModal = ({
  showModalUserData,
  handleCloseModalUserData,
  selectedUser
}) => {

  const inputHandlerFunction = (e) => {
    setEditedData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendMessageFunction = () => {
    sendMessage()
    .then((e) => e)
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
              name={"message"}
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
