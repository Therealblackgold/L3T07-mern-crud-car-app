import { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreatePage() {
  // car state
  const [car, setCar] = useState({
    model: "",
    make: "",
    owner: "",
    registration: "",
    address: "",
  });

  // declaring useNavigate variable to help redirecting to the homepage on submit.
  const navigate = useNavigate();

  // Handling form input function
  const handleChange = (event) => {
    const { name, value } = event.target;

    setCar((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  /* Handling form submit this function handles submitting the form
  and making the post request to create a new car in the database */
  const handleSubmit = (event) => {
    event.preventDefault();
    // declaring newCar
    const newCar = {
      model: car.model,
      make: car.make,
      owner: car.owner,
      registration: car.registration,
      address: car.address,
    };
    // Validating if all fields are completed before making a request
    if (
      !car.model ||
      !car.make ||
      !car.owner ||
      !car.registration ||
      !car.address
    ) {
      // form validation error alert
      toast.error("All fields are required");
    } else {
      // post request
      axios
        .post("/api/cars", newCar)
        .then((res) => toast.success(res.data.message))
        .catch((err) => console.log(err));

      // redirect to homepage
      navigate("/");
    }
  };

  // returning the UI
  return (
    <div className="container">
      <h4 className="text-center">Add a new car to the database</h4>
      <div className="mx-auto d-flex justify-content-center">
        <Form className="shadow p-5" style={{ width: "60%" }}>
          <Form.Group>
            <Form.Label>Model</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={car.model}
              name="model"
              placeholder="Example 2022"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Make</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={car.make}
              name="make"
              placeholder="Example BMW"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Owner</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={car.owner}
              name="owner"
              placeholder="Example John Doe"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Registration</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={car.registration}
              name="registration"
              placeholder="Example ABC 1234 GP"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={car.address}
              name="address"
              placeholder="Example 106 Forest Hills,Johannesburg,South Africa"
            />
            <div className="center">
              <Button
                onClick={handleSubmit}
                style={{ width: "30%" }}
                variant="success"
              >
                Save Car Details
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default CreatePage;
