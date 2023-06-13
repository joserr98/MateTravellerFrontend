import React from "react";
import "./Trip.css";

export const Trip = () => {
  return (
    <div className="tripDeisgn">
      <div className="tripContainer">
        <div className="tripCard">
          <div className="tripCardTitle">Málaga</div>
          <div className="tripCardInfo">
            <div className="tripDetails">
              <div className="tripDate">
                <div className="tripStartDate">StartDate</div>
                <div className="tripEndDate">EndDate</div>
              </div>
              <div className="tripDescription">Description</div>
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
