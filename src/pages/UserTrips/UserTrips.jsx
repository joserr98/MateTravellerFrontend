import React, { useEffect, useState } from "react";
import "./UserTrips.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../userSlice";
import {
  getPaginateTrips,
  getUserTrips,
  deleteTrip,
} from "../../services/apiCalls";
import { truncate } from "../../services/functions";
import { Button } from "react-bootstrap";
import { ConfirmationModal } from "../../common/ConfirmationModal/ConfirmationModal";
import { detail } from "../detailSlice";

export const UserTrips = () => {
  const [trips, setTrips] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState("");
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
          const currentPages = results.data.userTrips.length;
          const totalPages = Math.ceil(currentPages / 9);
          setPages(totalPages);
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
            const currentPages = results.data.data.length;
            const totalPages = Math.ceil(currentPages / 9);
            setPages(totalPages);
          })
          .catch((err) => console.error(err));
        getPaginateTrips(page)
          .then((results) => {
            setTrips(results.data.data.data);
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
        ) : (
          <></>
        )}
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
