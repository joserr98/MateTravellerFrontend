import axios from "axios";

const url = "http://localhost:8000/api"

// USERS ENDPOINTS
export const loginUser = async (credentials) => {
    return await axios.post(`${url}/login`, credentials);
};

export const registerUser = async (credentials) => {
    return await axios.post(`${url}/users`, credentials);
};

export const editUser = async (credentials, body) => {
    const config = {
        headers: {
          Authorization: "Bearer " + credentials.jwt,
        }
      }

    return await axios.patch(`${url}/users/${credentials.token.id}`, body, config);
};

export const deleteUser = async (credentials) => {
    const config = {
        headers: {
          Authorization: "Bearer " + credentials.jwt,
        }
      }

    return await axios.delete(`${url}/users/${credentials.token.id}`, config);
};

// TRIPS ENDPOINTS
export const getAllTrips = async () => {
    return await axios.get(`${url}/trips`);
};

export const getPaginateTrips = async (page) => {
    return await axios.get(`${url}/trips/pages?page=${page}`);
};

export const getUsersFromTrip = async (trip) => {
    return await axios.get(`${url}/users/trips/${trip}`);
};

