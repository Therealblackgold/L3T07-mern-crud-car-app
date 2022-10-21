import { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

function UpdateManyPage() {
  // declaring car state
  const [car, setCar] = useState({
    model: "",
    make: "",
    owner: "",
    registration: "",
    address: "",
  });

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
  const handleUpdateMany = (event) => {
    event.preventDefault();

    const updatedCar = {
      model: car.model,
      make: car.make,
      owner: car.owner,
      registration: car.registration,
      address: car.address,
    };
    // form validation
    if (!car.owner && !car.address) {
      toast.error("All fields are required");
    } else {
      // making request
      axios
        .post("/api/cars/updateMany", updatedCar)
        .then((res) => {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((err) => console.log(err));
    }
  };

  // returning UI
  return (
    <>
      <Form className="shadow p-3">
        <h4>Update the address of all cars with the same owner</h4>
        <Form.Group>
          <div className="row">
            <div className="col">
              <Form.Label>Existing Owner</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={car.owner}
                name="owner"
                placeholder="Example John Doe"
              />
            </div>
            <div className="col">
              <Form.Label>New Address</Form.Label>
              <Form.Control
                onChange={handleChange}
                value={car.address}
                name="address"
                placeholder="Example 106 Forest Hills,Johannesburg,South Africa"
              />
            </div>
          </div>
          <div className="center">
            <Button
              onClick={handleUpdateMany}
              style={{ width: "20%" }}
              variant="success"
            >
              Update Address
            </Button>
          </div>
        </Form.Group>
      </Form>
    </>
  );
}

export default UpdateManyPage;
