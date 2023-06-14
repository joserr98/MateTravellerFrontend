import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

export const NewTripModal = ({
    showModalNewTrip,
    handleCloseModalNewTrip,
    inputHandlerFunction,
    newTripFunction,
    today,
    startDate
  }) => {
  

  return (
    <Modal show={showModalNewTrip} onHide={handleCloseModalNewTrip}>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder={"City"}
              name={"city"}
              onChange={(e) => inputHandlerFunction(e)}
              autoFocus
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              placeholder={""}
              name={"start_date"}
              min={today}
              onChange={(e) => inputHandlerFunction(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              placeholder={""}
              name={"end_date"}
              min={startDate}
              onChange={(e) => inputHandlerFunction(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name={"description"}
              placeholder={"description"}
              onChange={(e) => inputHandlerFunction(e)}
              as="textarea" rows={3} 
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModalNewTrip}>
          Close
        </Button>
        <Button variant="primary" onClick={() => newTripFunction()}>
          New Trip
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
