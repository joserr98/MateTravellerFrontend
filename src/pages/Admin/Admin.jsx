import React, { useEffect, useState } from "react";
import "./Admin.css";
import { ConfirmationModal } from "../../common/ConfirmationModal/ConfirmationModal";
import { Button, ButtonGroup, ButtonToolbar, Form, InputGroup } from "react-bootstrap";
import { FcSearch } from "react-icons/fc";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { getUsersPaginate, deleteUser } from "../../services/apiCalls";
import { dateFormatMonth, getAge, truncate, useCapitals } from "../../services/functions";

export const Admin = () => {
  const ADMIN_ROLE = 3;
  const [users, setUsers] = useState([]);
  const rdxUserData = useSelector(userData);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const navigate = useNavigate();
  const [criteria, setCriteria] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const inputHandler = (e) => {
    setCriteria(e.target.value);
  };

  const handleDeleteUser = () => {
    setShowConfirmationModal(true);
  };

  const deleteUserFunction = (selectedUser) => {
    deleteUser(rdxUserData.credentials, selectedUser)
    .then(() => {
      handleCloseConfirmationModal();
      getUsersPaginate(page)
      .then((results) => {
        setUsers(results.data.data.data);
      })
      .catch((err) => console.error(err));
    })
    .catch((error) => console.error(error));
  }

  const setPageFunction = (newPage) => {
    setPage(newPage);
    getUsersPaginate(newPage)
      .then((results) => {
        setUsers(results.data.data.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (
      !rdxUserData.credentials.token ||
      rdxUserData.credentials.token.role_id != ADMIN_ROLE
    ) {
      navigate("/");
    }

    getUsersPaginate(page)
      .then((res) => {
        setUsers(res.data.data.data);
        setPages(res.data.data.total_pages)
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="adminDesign">
      <div className="adminSearchInput">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <FcSearch />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Filter by name, surname, email, country..."
            name="criteria"
            onChange={(e) => inputHandler(e)}
          />
        </InputGroup>
      </div>
      {users.length > 0 ? (
        <div className="adminTable">
          <table className="usersTable">
            <thead className="fixed">
              <tr>
                <th className="th" style={{ width: "20%" }}>
                  Name
                </th>
                <th className="th" style={{ width: "30%" }}>
                  Email
                </th>
                <th className="th" style={{ width: "20%" }}>
                  Birthday
                </th>
                <th className="thCountry" style={{ width: "25%" }}>
                  Country
                </th>
                <th className="thOptions" style={{ width: "5%" }}></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="selectedRow" key={user.id}>
                  <td
                    title={
                      useCapitals(user.name, "first") +
                      " " +
                      useCapitals(user.lastname, "first")
                    }
                  >
                    {truncate(useCapitals(user.name, "first"), 15)}
                  </td>
                  <td title={user.email}>
                    {truncate(useCapitals(user.email, "first"), 20)}
                  </td>
                  <td title={user.birthday}>{dateFormatMonth(user.birthday)}</td>
                  <td title={user.country}>
                    {truncate(useCapitals(user.country, "first"), 10)}
                  </td>
                  <td className="adminButtons">
                    <div>
                      <AiFillDelete
                        className="delete"
                        title="Delete appointment"
                        onClick={() =>{ 
                            handleDeleteUser();
                            setSelectedUser(user.id)}}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}

      <div className="userPagination">
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
            {page !== 1 && page !== 2 ? (
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
            {page !== pages && page !== pages - 1 ? (
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

      <ConfirmationModal
        showConfirmationModal={showConfirmationModal}
        handleCloseConfirmationModal={handleCloseConfirmationModal}
        deleteUserFunction={deleteUserFunction}
        name={"user"}
        userId={selectedUser}
      />
    </div>
  );
};
