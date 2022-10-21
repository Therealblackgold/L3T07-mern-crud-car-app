import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UserMessages from "./UserMessages";
import CarTableModal from "./CarTableModal";
import CarList from "./CarList";
// loader image
import LOADER from "../assets/loader.png";
import { Button } from "react-bootstrap";
import UpdateMany from "./UpdateMany";

function Homepage() {
  //----------------- APP STATE ---------------//
  const state = [
    {
      _id: "",
      make: "",
      model: "",
      owner: "",
      registration: "",
      address: "",
    },
  ];
  const [cars, setCars] = useState(state);
  const [olderCars, setOlderCars] = useState(state);
  const [filteredCarsList, setFilteredCarsList] = useState(false);
  const [updatedCar, setUpdatedCar] = useState("");
  const [loading, setLoading] = useState(false);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  //----------------- MODAL STATE ---------------//
  /*Declaring variables to store the state of the bootstrap modal 
  that holds the car update form */
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //----------------- GET CARS FUNCTION ---------------//
  /*This function sends a get request to get all data when the app loads
  im using a useReducer to assist with reloading the page when theres changes in the state
   its not the best solution but it works */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios({
          method: "GET",
          url: "/api/cars",
        });
        setCars(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchData();
  }, [reducerValue]);

  //----------------- GET OLD CARS FUNCTION ---------------//
  /*The fetchOldCars function gets all the cars older than five years
  also using loading state that will be true while waiting for the
  database response */
  const fetchOldCars = async () => {
    setLoading(true);
    try {
      const { data } = await axios({
        method: "GET",
        url: "/api/cars/filter",
      });
      setOlderCars(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  //----------------- TOGGLE CARS LIST ---------------//
  /*Toggling between all the cars in the database and all the old cars list and 
  I also call the fetchOldCars function to load the old car list*/
  const toggleCarsList = (event) => {
    event.preventDefault();
    setFilteredCarsList((current) => !current);
    fetchOldCars();
  };

  //----------------- UPDATE CAR FUNCTION ---------------//
  /*updateCar function takes a car param which helps identify selected
  car from the table and get the instance values of the car being updated*/
  const updateCar = (car) => {
    setUpdatedCar(car);
    // show modal
    handleShow();
  };

  //----------------- HANDLE FORM CHANGE ---------------//
  /*handleChange just handles form input field changes for the model
  when updating values*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCar((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //----------------- SAVE UPDATED CAR ---------------//
  /*saveUpdatedCar sends a put request to the api with the updatedCar values*/
  const saveUpdatedCar = () => {
    axios
      .put(`/api/cars/${updatedCar._id}`, updatedCar)
      .then((res) => toast.success(res.data.message))
      .catch((err) => console.log(err));

    // close modal
    handleClose();
    // reload the page after 1 second
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  //----------------- DELETE FUNCTION ---------------//
  /*deleteCar just takes an id param and deletes item by id */
  const deleteCar = (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm === true) {
      axios
        .delete(`/api/cars/${id}`)
        .then((res) => {
          toast.success(res.data.message);
          forceUpdate();
        })
        .catch((err) => console.log(err));
    }
  };

  //----------------- RETURNING THE UI ---------------//
  return (
    <>
      {/* UserMassages component props error, isLoading, LOADER */}
      <UserMessages loading={loading} LOADER={LOADER} />
      <CarTableModal
        show={show}
        updatedCar={updatedCar}
        handleChange={handleChange}
        saveUpdatedCar={saveUpdatedCar}
        handleClose={handleClose}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="row mb-4">
              <div className="col-10">
                <UpdateMany />
              </div>
              <div className="col">
                <Button
                  className="button black"
                  onClick={toggleCarsList}
                  variant="success"
                >
                  {filteredCarsList ? "List All Cars" : "List Older Cars"}
                </Button>
              </div>
            </div>
            {/* using a ternary to toggle between all cars and older cars */}
            {filteredCarsList === true ? (
              <CarList
                cars={olderCars}
                updateCar={updateCar}
                deleteCar={deleteCar}
              />
            ) : (
              <CarList
                cars={cars}
                updateCar={updateCar}
                deleteCar={deleteCar}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
