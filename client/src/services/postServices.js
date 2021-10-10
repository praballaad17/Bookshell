import axios from 'axios';
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/post";

export const postByUsername = async (files, caption, username, paid, price, progress) => {
    try {
        const { data } = await axios.post(`${apiEndpoint}/${username}`,
            { files, caption, paid, price }, progress);
        return { data };
    } catch (err) {
        throw new Error(err.response.data.error);
    }
};

export const retrivePostByUsername = async (username) => {
    try {
        const response = await axios.get(`${apiEndpoint}/${username}`);
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.error);
    }
};


export const getUserPhotosByUsername = async (username, logginUserId, pageNumber, limit) => {
    try {
        const response = await axios.get(`${apiEndpoint}/user-posts/${username}`,
            {
                params: { page: pageNumber, limit: limit, logginUserId: logginUserId }
            });
        return response.data;
    } catch (err) {
        return err;
    }
};

export const retrivePostByUserId = async (userId) => {
    try {
        const response = await axios.get(`${apiEndpoint}/userId/${userId}`);
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.error);
    }
};

export const getPost = async (userId, page, limit) => {
    try {
        const response = await axios.get(`${apiEndpoint}/all-posts/${userId}`, {
            params: { page: page, limit: limit }
        });
        return response.data;
    } catch (err) {
        throw new Error(err.response.data.error);
    }
};

export const deletePostById = async (postId) => {
    try {
        const response = await axios.delete(`${apiEndpoint}/delete/${postId}`);
        return response.data;
    } catch (err) {
        return err.response.data.error;
    }
};