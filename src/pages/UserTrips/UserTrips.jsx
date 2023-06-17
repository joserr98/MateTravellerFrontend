import React, { useEffect, useState } from "react";
import "./UserTrips.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../userSlice";
import {
  getUserTrips,
  deleteTrip,
} from "../../services/apiCalls";
import { truncate } from "../../services/functions";
import { Button } from "react-bootstrap";
import { ConfirmationModal } from "../../common/ConfirmationModal/ConfirmationModal";
import { detail } from "../detailSlice";

export const UserTrips = () => {
  const [trips, setTrips] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [tripId, setTripId] = useState("");
  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rdxUserData = useSelector(userData);
  const userCredentials = Object.keys(rdxUserData.credentials).length;

  useEffect(() => {
    getUserTrips(rdxUserData.credentials)
      .then((results) => {
          setTrips(results.data.userTrips);
        })
        .catch((err) => console.error(err));
  }, []);

  const showTripFunction = (trip) => {
    dispatch(detail({ data: trip }));
    navigate(`/trip`);
  };

  const deleteTripFunction = (tripId) => {
    deleteTrip(rdxUserData.credentials, tripId)
      .then(() => {
        setShowConfirmationModal(false);
        getUserTrips(rdxUserData.credentials)
          .then((results) => {

            setTrips(results.data.userTrips);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  
  return (
    <div className="userTripsDesign">
      <div className="tripsContainer">
        {trips.length !== 0 ? (
          <div className="trips">
            {trips.map((trip) => (
              <div className="trip" key={trip.id}>
                <div className="tripsTitle">
                  <div className="tripsCity">{trip.city.toUpperCase()}</div>
                  <div
                    className="deleteTrips"
                    onClick={() => {
                      setShowConfirmationModal(true);
                      setTripId(trip.id);
                    }}
                  >
                    <a>x</a>
                  </div>
                </div>
                <div className="tripsDates">
                  <div className="startDate">FROM: {trip.start_date}</div>
                  <div className="endDate">TO: {trip.end_date}</div>
                </div>
                <div className="tripsDescription" title={trip.description}>
                  {truncate(trip.description, 100)}
                </div>
                {userCredentials != 0 ? (
                  <div className="tripsButton">
                    <Button
                      className="showTripButton"
                      onClick={() => showTripFunction(trip)}
                    >
                      Show trip
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        ) : (<div>You dont have any trip yet!</div>) }
      </div>
      <ConfirmationModal
        showConfirmationModal={showConfirmationModal}
        handleCloseConfirmationModal={handleCloseConfirmationModal}
        deleteTripFunction={deleteTripFunction}
        name={"trip"}
        tripId={tripId}
      />
    </div>
  );
};
