import React, { useState, useEffect } from "react";
import "./Trips.css";
import { userData } from "../userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllTrips, getPaginateTrips } from "../../services/apiCalls";
import Button from "react-bootstrap/Button";
import { truncate } from "../../services/functions";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { useNavigate } from "react-router-dom";
import { detail } from "../detailSlice";

export const Trips = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rdxUserData = useSelector(userData);
  const userCredentials = Object.keys(rdxUserData.credentials).length;

  const [trips, setTrips] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState("");

  useEffect(() => {
    getAllTrips()
      .then((results) => {
        const currentPages = results.data.data.length;
        const totalPages = currentPages / 9;
        if (Number.isInteger(totalPages)) {
          setPages(totalPages);
        }
        setPages(parseInt(totalPages) + 1);
      })
      .catch((err) => console.error(err));

    getPaginateTrips(page)
      .then((results) => {
        setTrips(results.data.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const setPageFunction = (newPage) => {
    setPage(newPage);
    getPaginateTrips(newPage)
      .then((results) => {
        setTrips(results.data.data.data);
      })
      .catch((err) => console.error(err));
  };

  const showTripFunction = (trip) => {
    dispatch(detail({ data: trip }));
    navigate(`/trip`);
  };

  return (
    <div className="tripsDeisgn">
      {trips.length !== 0 ? (
        <div className="tripsContainer">
          <div className="trips">
            {trips.map((trip) => (
              <div className="trip" key={trip.id}>
                <div className="tripsCity">{trip.city.toUpperCase()}</div>
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
          <div className="pagination">
            <ButtonToolbar aria-label="Toolbar with button groups">
              <ButtonGroup className="me-2">
                {page != 1 ? (
                  <Button
                    className="paginationButton"
                    onClick={() => setPageFunction(1)}
                  >
                    1
                  </Button>
                ) : (
                  <></>
                )}
                {page != 1 ? (
                  <Button
                    className="paginationButton"
                    onClick={() => setPageFunction(page - 1)}
                  >
                    Previous
                  </Button>
                ) : (
                  <></>
                )}
                <Button className="paginationButton activePage">{page}</Button>
                {page != pages ? (
                  <Button
                    className="paginationButton"
                    onClick={() => setPageFunction(page + 1)}
                  >
                    Next
                  </Button>
                ) : (
                  <></>
                )}
                {page != pages ? (
                  <Button
                    className="paginationButton"
                    onClick={() => setPageFunction(pages)}
                  >
                    {pages}
                  </Button>
                ) : (
                  <></>
                )}
              </ButtonGroup>
            </ButtonToolbar>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
