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
import { getAge, truncate, dateFormatMonth } from "../../services/functions";
import { Button, Table } from "react-bootstrap";
import { PrivateMessageModal } from "../../common/PrivateMessageModal/PrivateMessageModal";

export const Trip = () => {
  const rdxUserData = useSelector(userData);
  const rdxTripData = useSelector(detailData);
  const [organizer, setOrganizer] = useState({});
  const [travelers, setTravelers] = useState([]);
  const [showModalUserData, setShowModalUserData] = useState(false);
  const [selectedUser, setSelectedUser] = useState({})

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
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  const handleOpenModalUserData = () => {
    setShowModalUserData(true);
  };

  const handleCloseModalUserData = () => {
    setShowModalUserData(false);
  };

  return (
    <div className="tripDeisgn">
      <div className="tripContainer">
        <div className="tripCard">
          <div className="tripCardTitle">{rdxTripData.data.city}</div>
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
                <div className="tripOrganizer" onClick={() => {handleOpenModalUserData(organizer); setSelectedUser(organizer)}}>{organizer.name}</div>
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
                            <a
                              className="link"
                              onClick={() => {handleOpenModalUserData(traveler); setSelectedUser(traveler)}}
                            >
                              {truncate(traveler.name, 20)}
                            </a>
                            , {getAge(traveler.birthday)}{" "}
                          </div>
                        </td>
                        <td>
                          <div
                            className="tripTravelerCountry"
                            title={traveler.country}
                          >
                            {truncate(traveler.country, 14)}
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

        <PrivateMessageModal
          showModalUserData={showModalUserData}
          handleCloseModalUserData={handleCloseModalUserData}
          selectedUser={selectedUser}
        />
      </div>
    </div>
  );
};
