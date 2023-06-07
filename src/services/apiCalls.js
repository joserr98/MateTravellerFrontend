import axios from "axios";

const url = "http://localhost:8000/api"

export const loginUser = async (credentials) => {
    return await axios.post(`${url}/login`, credentials);
};