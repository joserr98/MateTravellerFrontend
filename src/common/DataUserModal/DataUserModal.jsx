import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";

export const DataUserModal = ({
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

  const sendMessage = () => {};

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
              rows={4}
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
        <Button variant="primary" onClick={() => sendMessage()}>
          Send Message
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
