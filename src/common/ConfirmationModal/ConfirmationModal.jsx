import React from "react";
import { Modal, Button } from "react-bootstrap";

export const ConfirmationModal = ({
  showConfirmationModal,
  handleCloseConfirmationModal,
  deleteProfileFunction,
  deleteUserFunction,
  deleteTripFunction,
  name,
  tripId,
  userId
}) => {
  return (
    <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this {name}? </p>
        <p>There is no comeback</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => handleCloseConfirmationModal()}
        >
          Cancel
        </Button>
        {deleteProfileFunction ? (
          <Button variant="danger" onClick={() => deleteProfileFunction()}>
            Delete
          </Button>
        ) : (
          <></>
        )}
        {deleteTripFunction ? (
          <Button variant="danger" onClick={() => deleteTripFunction(tripId)}>
            Delete
          </Button>
        ) : (
          <></>
        )}
        {deleteUserFunction ? (
          <Button variant="danger" onClick={() => deleteUserFunction(userId)}>
            Delete
          </Button>
        ) : (
          <></>
        )}
      </Modal.Footer>
    </Modal>
  );
};
