import axios from 'axios';
import { apiUrl } from "../config.json";
import jwtDecode from 'jwt-decode';

const apiEndpoint = apiUrl + "/user";
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

export const getusersFollowing = async (usernameOrEmail) => {
    try {
        const response = await axios.get(`${apiEndpoint}/username/following/${usernameOrEmail}`);
        return response.data;
    } catch (err) {
        console.log(err.response?.data.error);
    }
}

export const getusersFollowers = async (usernameOrEmail) => {
    try {
        const response = await axios.get(`${apiEndpoint}/username/followers/${usernameOrEmail}`);
        return response.data;
    } catch (err) {
        console.log(err.response?.data.error);
    }
}

export const toggleFollow = async (isFollowingProfile,
    profileUserId,
    followingUserId) => {
    if (isFollowingProfile) {
        console.log("unfollwing");
        //remove followingUserId from profileUserId's follower list
        //remove profileUserId from followingUserId's following list
        await axios.put(`${apiEndpoint}/unfollow/${profileUserId}`, {
            followingUserId
        })
    }
    else {
        console.log("follow");
        //add followingUserId in profileUserId's follower list
        //add profileUserId's from followingUserId's following list
        await axios.put(`${apiEndpoint}/follow/${profileUserId}`, {
            followingUserId
        })

    }
}