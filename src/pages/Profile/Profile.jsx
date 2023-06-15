import React, { useState } from "react";
import "./Profile.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import avatar from "../../assets/avatar.png";
import { userData, login, logout } from "../userSlice";
import { useSelector } from "react-redux";
import { dateFormat } from "../../services/functions";
import { Button } from "react-bootstrap";
import { EditProfileModal } from "../../common/EditProfileModal/EditProfileModal";
import { editUser, deleteUser } from "../../services/apiCalls";
import { useDispatch } from "react-redux";
import { ConfirmationModal } from "../../common/ConfirmationModal/ConfirmationModal";
import { useNavigate } from "react-router-dom";

export const Profile = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const rdxUserData = useSelector(userData);

  const [showModalProfileEdit, setShowModalProfileEdit] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [editedData, setEditedData] = useState({
    id: rdxUserData.credentials.token.id,
    name: rdxUserData.credentials.token.name,
    lastname: rdxUserData.credentials.token.lastname,
    email: rdxUserData.credentials.token.email,
    country: rdxUserData.credentials.token.country,
    birthday: rdxUserData.credentials.token.birthday,
    password: "",
  });

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleOpenModalEdit = () => {
    setShowModalProfileEdit(true);
  };

  const [showToast, setShowToast] = useState(false);

  const inputHandlerFunction = (e) => {
    setEditedData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCloseModalEdit = () => {
    setShowModalProfileEdit(false);
  };

  const editProfileFunction = () => {
    if (!editedData.password) {
      setShowToast(true);
    }
    editUser(rdxUserData.credentials, editedData)
      .then(() => {
        const data = {
          jwt: rdxUserData.credentials.jwt,
          token: editedData,
        };
        dispatch(login({ credentials: data }));
        setShowModalProfileEdit(false);
      })
      .catch((error) => console.error(error));
  };

  const deleteUserFunction = () => {
    deleteUser(rdxUserData.credentials)
      .then(() => {
        handleCloseConfirmationModal();
        dispatch(logout({ credentials: {} }));
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="profileDesign">
      <Container className="profileContainer">
        <Row>
          <Col md={3}></Col>
          <Col md={6} className="centerContent">
            <img className="profileLogo" src={avatar} alt="" />
          </Col>
          <Col md={3}></Col>
        </Row>
        <Row>
          <Col md={4}></Col>
          <Col className="profileColumn mb-3 flexEnd" md={2}>
            <a>Name</a>
          </Col>
          <Col className="profileColumn mb-3" md={4}>
            {rdxUserData.credentials.token.name}{" "}
            {rdxUserData.credentials.token.lastname}
          </Col>
          <Col md={2}></Col>
        </Row>
        <Row>
          <Col md={4}></Col>
          <Col className="profileColumn mb-3 flexEnd" md={2}>
            <a>Email</a>
          </Col>
          <Col className="profileColumn mb-3" md={4}>
            {rdxUserData.credentials.token.email}
          </Col>
          <Col md={2}></Col>
        </Row>
        {rdxUserData.credentials.token?.birthday ? (
          <Row>
            <Col md={4}></Col>
            <Col className="profileColumn mb-3 flexEnd" md={2}>
              <a>Birthday</a>
            </Col>
            <Col className="profileColumn mb-3" md={4}>
              {dateFormat(rdxUserData.credentials.token.birthday)}
            </Col>
            <Col md={2}></Col>
          </Row>
        ) : (
          <></>
        )}
        {rdxUserData?.credentials?.token?.country ? (
          <Row>
            <Col md={4}></Col>
            <Col className="profileColumn mb-3 flexEnd" md={2}>
              <a>Country</a>
            </Col>
            <Col className="profileColumn mb-3" md={4}>
              {rdxUserData.credentials.token.country}
            </Col>
            <Col md={2}></Col>
          </Row>
        ) : (
          <></>
        )}
        <div className="profileButtons">
          <Button
            className="editProfileBtn"
            size="md"
            onClick={() => handleOpenModalEdit(rdxUserData.credentials.token)}
          >
            Edit profile
          </Button>
          <Button
            className="deleteProfileBtn"
            size="md"
            onClick={() => setShowConfirmationModal(true)}
          >
            Erase account
          </Button>
        </div>
      </Container>

      <EditProfileModal
        showModalProfileEdit={showModalProfileEdit}
        handleCloseModalEdit={handleCloseModalEdit}
        inputHandlerFunction={inputHandlerFunction}
        editProfileFunction={editProfileFunction}
        setShowToast={setShowToast}
        showToast={showToast}
      />

      <ConfirmationModal
      showConfirmationModal={showConfirmationModal}
      handleCloseConfirmationModal={handleCloseConfirmationModal}
      deleteUserFunction={deleteUserFunction}
      name={"profile"}
      />
    </div>
  );
};
