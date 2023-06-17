import React from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Form } from "react-bootstrap";
import { userData } from "../../pages/userSlice";
import { ErrorToast } from "../ErrorToast/ErrorToast";

export const EditProfileModal = ({
    showModalProfileEdit,
    handleCloseModalEdit,
    inputHandlerFunction,
    editProfileFunction,
    showToast,
    setShowToast,
    errorMessage
  }) => {
  
  const rdxUserData = useSelector(userData);
  const today = new Date().toISOString().split("T")[0];

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
              placeholder={rdxUserData.credentials.token.name}
              name={"name"}
              onChange={(e) => inputHandlerFunction(e)}
              autoFocus
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              type="text"
              placeholder={rdxUserData.credentials.token.lastname}
              name={"lastname"}
              onChange={(e) => inputHandlerFunction(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder={rdxUserData.credentials.token.email}
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
              placeholder={rdxUserData.credentials.token.country}
              name={"country"}
              onChange={(e) => inputHandlerFunction(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              placeholder={rdxUserData.credentials.token.birthday}
              name={"birthday"}
              max={today}
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

      <ErrorToast
      showToast={showToast}
      setShowToast={setShowToast}
      errorMessage={errorMessage}
      />
    </Modal>
  );
};
