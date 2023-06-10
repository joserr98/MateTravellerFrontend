import React from "react";
import { useSelector } from "react-redux";
import "./EditProfileModal.css";
import { Button, Modal, Form } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import { userData } from "../../pages/userSlice";

export const EditProfileModal = ({
    showModalProfileEdit,
    handleCloseModalEdit,
    inputHandlerFunction,
    editProfileFunction,
    showToast,
    setShowToast,
  }) => {
  
  const userDataRdx = useSelector(userData);

  return (
    <Modal show={showModalProfileEdit} onHide={handleCloseModalEdit}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder={userDataRdx.credentials.token.name}
              name={"name"}
              onChange={(e) => inputHandlerFunction(e)}
              autoFocus
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              type="text"
              placeholder={userDataRdx.credentials.token.lastname}
              name={"lastname"}
              onChange={(e) => inputHandlerFunction(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder={userDataRdx.credentials.token.email}
              name={"email"}
              onChange={(e) => inputHandlerFunction(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name={"password"}
              onChange={(e) => inputHandlerFunction(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder={userDataRdx.credentials.token.country}
              name={"country"}
              onChange={(e) => inputHandlerFunction(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              placeholder={userDataRdx.credentials.token.birthday}
              name={"birthday"}
              onChange={(e) => inputHandlerFunction(e)}
            />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModalEdit}>
          Close
        </Button>
        <Button variant="primary" onClick={() => editProfileFunction()}>
          Save Changes
        </Button>
      </Modal.Footer>

      <div className="toast-container">
        <Toast
          bg={"danger"}
          show={showToast}
          delay={1350}
          autohide
          className="toasted"
          style={{
            position: "fixed",
            zIndex: 999,
            top: 0,
          }}
          onClose={() => setShowToast(false)}
        >
          <Toast.Body>Please, make sure you enter your password.</Toast.Body>
        </Toast>
      </div>
    </Modal>
  );
};
