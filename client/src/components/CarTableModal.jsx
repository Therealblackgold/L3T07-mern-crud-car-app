// This component return a bootstrap modal to update items
import { Button, Form, Modal } from "react-bootstrap";

function CarTableModal({
  show,
  updatedCar,
  handleChange,
  saveUpdatedCar,
  handleClose,
}) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update a car in the database</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form style={{ padding: "1rem" }}>
            <Form.Group>
              <Form.Control
                placeholder="Model"
                name="model"
                value={updatedCar.model ? updatedCar.model : ""}
                onChange={handleChange}
              />
              <Form.Control
                placeholder="Make"
                name="make"
                value={updatedCar.make ? updatedCar.make : ""}
                onChange={handleChange}
              />
              <Form.Control
                placeholder="Owner"
                name="owner"
                value={updatedCar.owner ? updatedCar.owner : ""}
                onChange={handleChange}
              />
              <Form.Control
                placeholder="Registration"
                name="registration"
                value={updatedCar.registration ? updatedCar.registration : ""}
                onChange={handleChange}
              />
              <Form.Control
                placeholder="Address"
                name="address"
                value={updatedCar.address ? updatedCar.address : ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="warning"
            onClick={saveUpdatedCar}
            className="cta-btn"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CarTableModal;
