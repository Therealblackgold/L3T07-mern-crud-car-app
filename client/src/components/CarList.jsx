// This component renders a table to display items
import CarTableRow from "./CarTableRow";
import { Table } from "react-bootstrap";
function CarList({ cars, updateCar, deleteCar }) {
  return (
    <>
      <h4>Listing all cars in the database</h4>
      <Table striped bordered hover className="shadow">
        <thead>
          <tr>
            <th>Model</th>
            <th>Make</th>
            <th>Owner</th>
            <th>Registration</th>
            <th>Address</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <CarTableRow
            cars={cars}
            updateCar={updateCar}
            deleteCar={deleteCar}
          />
        </tbody>
      </Table>
    </>
  );
}

export default CarList;
