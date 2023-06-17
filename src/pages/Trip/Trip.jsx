import React, { useEffect, useState } from "react";
import "./Trip.css";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { detailData } from "../detailSlice";
import {
  getOrganizerFromTrip,
  getTravelersFromTrip,
  joinTrip,
} from "../../services/apiCalls";
import { IoChevronBackCircleOutline } from 'react-icons/io5';
import { getAge, truncate, dateFormatMonth } from "../../services/functions";
import { Button, Table } from "react-bootstrap";
import { PrivateMessageModal } from "../../common/PrivateMessageModal/PrivateMessageModal";
import { ErrorToast } from "../../common/ErrorToast/ErrorToast";
import { useNavigate } from "react-router-dom";

export const Trip = () => {

  const navigate = useNavigate();
  const rdxUserData = useSelector(userData);
  const rdxTripData = useSelector(detailData);
  const [organizer, setOrganizer] = useState({});
  const [travelers, setTravelers] = useState([]);
  const [showModalUserData, setShowModalUserData] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    getOrganizerFromTrip(rdxTripData)
      .then((results) => {
        setOrganizer(results.data.usersFromTrip[0]);
      })
      .catch((err) => console.error(err));

    getTravelersFromTrip(rdxTripData)
      .then((results) => {
        setTravelers(results.data.usersFromTrip);
      })
      .catch((err) => console.error(err));
  }, []);

  const joinTripFunction = (tripId) => {
    joinTrip(rdxUserData.credentials, tripId)
      .then(() => {
        getTravelersFromTrip(rdxTripData)
          .then((results) => {
            setTravelers(results.data.usersFromTrip);
          })
          .catch((err) => {console.error(err)});
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setShowToast(true);});
  };

  const handleOpenModalUserData = () => {
    setShowModalUserData(true);
  };

  const handleCloseModalUserData = () => {
    setShowModalUserData(false);
  };

  const isTravelerOrOrganizer = () => {
    if (
      rdxUserData.credentials.token.id == organizer.user_id ||
      travelers.some(
        (traveler) => traveler.user_id == rdxUserData.credentials.token.id
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="tripDeisgn">
      <div className="tripContainer">
        <div className="tripCard">
          <div className="tripCardTitle">
            <div className="back"><IoChevronBackCircleOutline className="clickable" onClick={() => navigate('/trips')}/></div>
            <div className="titleTrip">{rdxTripData.data.city}</div>
          </div>
          <div className="tripCardInfo">
            <div className="tripDetails">
              <div className="tripDate">
                <div className="tripStartDate">
                  {" "}
                  {""}
                  {dateFormatMonth(rdxTripData.data.start_date)}
                </div>
                <div className="tripEndDate">
                  {" "}
                  {""}
                  {dateFormatMonth(rdxTripData.data.end_date)}
                </div>
              </div>
              <div className="tripDescription">
                {rdxTripData.data.description}
              </div>
              <div className="tripJoin">
                <Button
                  className="joinTripButton"
                  onClick={() => joinTripFunction(rdxTripData.data.id)}
                >
                  Join Trip
                </Button>
              </div>
            </div>
            <div className="tripParticipants">
              <div className="tripParticipantsTitle">Participants</div>
              <div className="tripOrganizerContainer">
                <div className="tripOrganizerTitle">Organizer</div>
                <div className="tripOrganizer">
                  {isTravelerOrOrganizer() ? (
                    <a
                      className="link"
                      onClick={() => {
                        handleOpenModalUserData(organizer);
                        setSelectedUser(organizer);
                      }}
                    >
                      {organizer.name}
                    </a>
                  ) : (
                    <span>{organizer.name}</span>
                  )}
                </div>
              </div>
              <div className="tripTraveler">
                <div className="tripUser"></div>

                <Table striped bordered hover variant="light">
                  <thead>
                    <tr>
                      <th>
                        <div> Name </div>
                      </th>
                      <th>
                        <div> Country </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody key={"tableBody"}>
                    {travelers.map((traveler) => (
                      <tr key={traveler.id}>
                        <td>
                          <div
                            className="tripTravelerName"
                            title={traveler.name}
                          >
                            {isTravelerOrOrganizer() &&
                            rdxUserData.credentials.token.id !==
                              traveler.user_id ? (
                              <a
                                className="link"
                                onClick={() => {
                                  handleOpenModalUserData(traveler);
                                  setSelectedUser(traveler);
                                }}
                              >
                                {traveler.name ? traveler.name : <></>}
                                {traveler.birthday ? (
                                  `,` + getAge(traveler.birthday)
                                ) : (
                                  <></>
                                )}{" "}
                              </a>
                            ) : (
                              <>
                                {traveler.name ? traveler.name : <></>}
                                {traveler.birthday ? (
                                  `,` + getAge(traveler.birthday)
                                ) : (
                                  <></>
                                )}{" "}
                              </>
                            )}
                          </div>
                        </td>
                        <td>
                          <div
                            className="tripTravelerCountry"
                            title={traveler.country}
                          >
                            {traveler.country ? (
                              truncate(traveler.country, 14)
                            ) : (
                              <></>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>

        <ErrorToast 
        setShowToast={setShowToast} 
        showToast={showToast}
        errorMessage={errorMessage}
      />

        {selectedUser && (
          <PrivateMessageModal
            showModalUserData={showModalUserData}
            handleCloseModalUserData={handleCloseModalUserData}
            selectedUser={selectedUser}
          />
        )}
      </div>
    </div>
  );
};
