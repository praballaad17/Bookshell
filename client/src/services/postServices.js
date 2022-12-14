import axios from 'axios';
import { apiUrl, localurl } from "../config.json";
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
// const apiEndpoint = apiUrl + "/post"; 
const apiEndpoint = localurl + "/post";

export const uploadFileToStorage = async (file, reffile) => {
    const storageRef = ref(storage, reffile);

    const uploadTask = (file, storageRef) =>
        new Promise((resolve) => {
            // 'file' comes from the Blob or File API
            uploadBytes(storageRef, file).then(async (snapshot) => {
                getDownloadURL(storageRef)
                    .then((url) => {
                        resolve(url)
                    })
            })
        });

    return await uploadTask(file, storageRef)
}


export const postByUsername = async ( files, title, caption, username, paid, price, progress) => {
    try {
        const { data } = await axios.post(`${apiEndpoint}/add-material/${username}`,
            { files, title, caption, paid, price }, progress);
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

export const getUserMaterialByUsername = async (username, logginUserId, pageNumber, limit) => {
    try {
        const response = await axios.get(`${apiEndpoint}/user-material/${username}`,
            {
                params: { page: pageNumber, limit: limit, logginUserId: logginUserId }
            });
        return response.data;
    } catch (err) {
        return err;
    }
};
export const getMaterialByTitle = async (title) => {
    try {
        const response = await axios.get(`${apiEndpoint}/title/${title}`
        );
        return response.data;
    } catch (err) {
        return err;
    }
}

export const buyMaterialById = async (materialId, userId, username, author) => {
    try {
        const response = await axios.post(`${apiEndpoint}/buy-material/${materialId}`,
            {
                username, author, userId
            })
        return response.data
    } catch (error) {
        return error;
    }
}

export const getUserPurcMaterialByUserId = async (userId) => {
    try {
        const response = await axios.get(`${apiEndpoint}/get-purc-material/${userId}`)
        return response.data;
    } catch (err) {
        return err;
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

export const addReview = async (message, userId, materialId) => {
    try {
        const response = await axios.post(`${apiEndpoint}/add-review/${materialId}`,
            { message, userId }
        );
        return response.data;
    } catch (err) {
        return err;
    }
}

export const getReviewByMaterialId = async (materialId) => {
    try {
        const response = await axios.get(`${apiEndpoint}/get-review/${materialId}`);
        return response.data;
    } catch (err) {
        return err;
    }
}

export const checkPurchased = async (userId, materialId) => {
    try {
        const response = await axios.post(`${apiEndpoint}/check-purchased`, {
            userId, materialId
        });
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