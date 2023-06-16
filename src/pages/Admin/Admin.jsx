import React, { useEffect, useState } from "react";
import "./Admin.css";
import { ConfirmationModal } from "../../common/ConfirmationModal/ConfirmationModal";
import { Form, InputGroup } from "react-bootstrap";
import { FcSearch } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const userDataRdx = useSelector(userData);
  const navigate = useNavigate();
  const [criteria, setCriteria] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const inputHandler = (e) => {
    setCriteria(e.target.value);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowConfirmationModal(true);
  };

  useEffect(() => {
    if (
      !userDataRdx.credentials.token ||
      userDataRdx.credentials.token.role !== "admin"
    ) {
    //   navigate("/");
    }
  }, []);

  const deleteUserFunction = () => {
    deleteUser(rdxUserData.credentials)
      .then(() => {
        handleCloseConfirmationModal();
      })
      .catch((error) => console.error(error));
  };

//   useEffect(() => {
//     if (criteria !== "") {
//       const bringUsers = setTimeout(() => {
//         getUsers(userDataRdx.credentials, criteria)
//           .then((res) => {
//             setUsers(res.data);
//           })
//           .catch((error) => console.log(error));
//       }, 375);

//       return () => clearTimeout(bringUsers);
//     } else {
//       getUsers(userDataRdx.credentials)
//         .then((results) => {
//           setUsers(results.data);
//         })
//         .catch((err) => console.error(err));
//     }
//   }, [criteria]);

  return (
    <div className="adminDesign">
      <div className="adminInput">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">
            <FcSearch />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="search"
            name="criteria"
            onChange={(e) => inputHandler(e)}
          />
        </InputGroup>
      </div>
      {users && users.length > 0 ? (
        <div className="adminTable">
          <table className="table table-striped table-bordered table-hover usersTable">
            <thead className="fixed">
              <tr>
                <th style={{ width: "30%" }}>Name</th>
                <th style={{ width: "30%" }}>Email</th>
                <th style={{ width: "10%" }}>Phone</th>
                <th style={{ width: "25%" }}>Address</th>
                <th style={{ width: "5%" }}></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr className="selectedRow" key={user._id}>
                  <td
                    title={
                      capitalizeWords(user.name) +
                      " " +
                      capitalizeWords(user.lastname)
                    }
                  >
                    {truncate(
                      capitalizeWords(`${user.name} ${user.lastname}`),
                      30
                    )}
                  </td>
                  <td title={user.email}>
                    {truncate(capitalizeWords(user.email), 20)}
                  </td>
                  <td title={user.phone_number}>{user.phone_number}</td>
                  <td title={user.address}>
                    {truncate(capitalizeWords(user.address), 22)}
                  </td>
                  <td>
                    <div className="adminButtons">
                      <FaEye
                        className="appointmentsButton detail"
                        onClick={() => handleOpenModalInfo(user)}
                      />

                      <FiEdit
                        className="appointmentsButton edit"
                        title="Edit appointment"
                        onClick={() => handleOpenModalEdit(user)}
                      />
                      <AiFillDelete
                        className="appointmentsButton delete"
                        title="Delete appointment"
                        onClick={() => {
                          handleDeleteUser(user);
                          deleteUserFunction();
                        }}
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
      <ConfirmationModal
        showConfirmationModal={showConfirmationModal}
        handleCloseConfirmationModal={handleCloseConfirmationModal}
        deleteUserFunction={deleteUserFunction}
        name={"profile"}
      />
    </div>
  );
};
