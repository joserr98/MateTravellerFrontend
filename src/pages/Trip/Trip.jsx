import React, { useEffect, useState } from "react";
import "./Trip.css";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { detailData } from "../detailSlice";
import { useNavigate } from "react-router-dom";
import { getDetailedTrip } from "../../services/apiCalls";
export const Trip = () => {

  const rdxUserData = useSelector(userData);
  const rdxTripData = useSelector(detailData);

  const [detailedTrip, setDetailedTrip] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    getDetailedTrip(rdxUserData.credentials, rdxTripData)
      .then((results) => {
        setDetailedTrip(results.data.data);
      })
      .catch((err) => console.error(err));
  },[]);

  return (
    <div className="tripDeisgn">
      <div className="tripContainer">
        <div className="tripCard">
          <div className="tripCardTitle">{rdxTripData.data.city}</div>
          <div className="tripCardInfo">
            <div className="tripDetails">
              <div className="tripDate">
                <div className="tripStartDate">{rdxTripData.data.start_date}</div>
                <div className="tripEndDate">{rdxTripData.data.end_date}</div>
              </div>
              <div className="tripDescription">{rdxTripData.data.description}</div>
            </div>
            <div className="tripParticipants">
              <div className="tripOrganizerTitle">Organizer</div>
              <div className="tripOrganizer">Juan</div>
              <div className="tripParticipantsTitle">Participants</div>
              <div className="tripTraveler">Jose</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
