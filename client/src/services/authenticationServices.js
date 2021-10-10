import axios from 'axios';
import { apiUrl } from "../config.json";
import jwtDecode from 'jwt-decode';

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token"
function setJwt(jwt) {
  axios.defaults.headers.common['x-auth-token'] = jwt
}

setJwt(getJwt())

export function getJwt() {
  return localStorage.getItem(tokenKey)
}
/**
 * Logs a user in with the provided credentials
 * @function login
 * @param {string} usernameOrEmail The username or email to login with
 * @param {string} password A password to log in with
 * @param {string} authToken A token to be used instead of a username/email or password
 * @returns {object} The user object
 */
export const login = async (usernameOrEmail, password, authToken) => {
  try {
    const request =
      usernameOrEmail && password
        ? { data: { usernameOrEmail, password } }
        : { headers: { authorization: authToken } };
    const response = await axios(`${apiEndpoint}/login`, {
      method: 'POST',
      ...request,
    });
    localStorage.setItem(tokenKey, response.data.token)
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};


/**
 * Registers a user with the provided credentials
 * @param {string} email A user's email address
 * @param {string} fullName A user's full name
 * @param {string} username A user's username
 * @param {string} password A user's password
 * @returns {object} The user object
 */
export const registerUser = async (username, fullName, email, password) => {
  try {
    const response = await axios.post(`${apiEndpoint}/register`, {
      email,
      fullName,
      username,
      password,
    });
    localStorage.setItem(tokenKey, response.data.token)
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

/**
 * Changes a users password
 * @function changePassword
 * @param {string} oldPassword The user's current password
 * @param {string} newPassword The new password
 * @param {string} authToken A user's auth token
 */
export const changePassword = async (oldPassword, newPassword, authToken) => {
  try {
    await axios.put(
      `${apiEndpoint}/password`,
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          authorization: authToken,
        },
      }
    );
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const getUserByUserId = async (id) => {
  try {
    const response = await axios.get(`${apiEndpoint}/userId/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
}


export const getusersFollowersById = async (userId) => {
  try {
    const response = await axios.get(`${apiUrl}/user/userId/followers/${userId}`);
    return response.data;
  } catch (err) {
    throw new Error(err);
  }
}

export async function logout() {
  localStorage.removeItem(tokenKey)
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}