import axios from 'axios';
import { apiUrl, localurl } from "../config.json";
import jwtDecode from 'jwt-decode';

// const apiEndpoint = apiUrl + "/user";
const apiEndpoint = localurl + "/user";

const tokenKey = "token"

export const getUserByUsername = async (usernameOrEmail) => {
    try {
        const response = await axios.get(`${apiEndpoint}/username/${usernameOrEmail}`);
        return response.data;
    } catch (err) {
        console.log(err.response?.data.error);
    }
}

export const searchUser = async (usernameOrname, pageNumber, limit, cancel) => {
    try {
        const response = await axios.get(`${apiEndpoint}/search/${usernameOrname}`, {
            params: { page: pageNumber, limit: limit },
            cancelToken: new axios.CancelToken(c => cancel = c)
        });
        return response.data;
    } catch (err) {
        console.log(err.response?.data.error);
    }
}

export const updateProfileImg = async (username, profileImg) => {
    try {
        const response = await axios.put(`${apiEndpoint}/profile-img/${username}`,
            { profileImg }
        );
        return response.data;
    } catch (err) {
        console.log(err.response?.data.error);
    }
};

export const removeProfileImg = async (username, profileImg) => {
    try {
        const response = await axios.delete(`${apiEndpoint}/profile-img/${username}`);
        return response.data;
    } catch (err) {
        console.log(err.response?.data.error);
    }
};

export const getuserDisplayImgs = async (username) => {
    try {
        const response = await axios.get(`${apiEndpoint}/display-imgs/${username}`);
        return response.data;
    } catch (err) {
        console.log(err.response?.data.error);
    }
};
