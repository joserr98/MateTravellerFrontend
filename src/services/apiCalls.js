import axios from "axios";

const url = "http://localhost:8000/api";
// const url = "https://mate-traveller-backend-final.vercel.app";

// USERS ENDPOINTS
export const loginUser = async (credentials) => {
  return await axios.post(`${url}/login`, credentials);
};

export const getUsersPaginate = async (page) => {
  return await axios.get(`${url}/users/pages?page=${page}`);
};

export const registerUser = async (credentials) => {
  return await axios.post(`${url}/users`, credentials);
};

export const filterByUser = async (filter) => {
  return await axios.get(`${url}/users/filter?filter=${filter}`);
};

export const editUser = async (credentials, body) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.jwt,
    },
  };

  return await axios.patch(
    `${url}/users/${credentials.token.id}`,
    body,
    config
  );
};

export const deleteUser = async (credentials, userId) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.jwt,
    },
  };
  console.log(userId)
  return await axios.delete(`${url}/users/${userId}`, config);
};

// TRIPS ENDPOINTS
export const getAllTrips = async () => {
  return await axios.get(`${url}/trips`);
};

export const getPaginateTrips = async (page) => {
  return await axios.get(`${url}/trips/pages?page=${page}`);
};

export const getTravelersFromTrip = async (trip) => {
  return await axios.get(`${url}/users/travelers/trips/${trip.data.id}`);
};

export const getOrganizerFromTrip = async (trip) => {
  return await axios.get(`${url}/users/organizer/trips/${trip.data.id}`);
};

export const getUserTrips = async (credentials) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.jwt,
    },
  };

  return await axios.get(`${url}/trips/users/${credentials.token.id}`, config);
};

export const joinTrip = async (credentials, tripId) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.jwt,
    },
  };
  
  return await axios.post(`${url}/trips/${tripId}`, {}, config);
};

export const newTrip = async (credentials, body) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.jwt,
    },
  };

  return await axios.post(`${url}/trips`, body, config);
};

export const deleteTrip = async (credentials, tripId) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.jwt,
    },
  };

  return await axios.delete(`${url}/trips/${tripId}`, config);
};

export const getMessages = async (credentials) => {
  const config = {
    headers: {
      Authorization: "Bearer " + credentials.jwt
    }
  }

  return await axios.get(`${url}/messages/${credentials.token.id}`, config);
}