// This component renders a table row for each item
import React from "react";
import { Button } from "react-bootstrap";

function CarTableRow({ cars, updateCar, deleteCar }) {
  return (
    <>
      {cars.map((car) => (
        <tr key={car._id}>
          <td>{car.model}</td>
          <td>{car.make}</td>
          <td>{car.owner}</td>
          <td>{car.registration}</td>
          <td>{car.address}</td>
          <td>
            <Button onClick={() => updateCar(car)} variant="success">
              <i className="bi bi-pencil-square"></i>
            </Button>
          </td>
          <td>
            <Button
              onClick={() => deleteCar(car._id)}
              className="delete-btn"
              variant="danger"
            >
              <i className="bi bi-trash3-fill"></i>
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
}

export default CarTableRow;
