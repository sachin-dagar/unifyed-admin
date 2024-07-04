import axios from "axios";
import { handleResponse, handleError } from "./response";

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
const serverApiPort = window.location.protocol == "http:" ? ":3002" : ":3003";
let BASE_URL = process.env.ADMIN_APP_API_URL || window.location.protocol + "//" + window.location.hostname + serverApiPort;

//If you wants to test the dev/live api's inside your local admin-ui project,Then use the below BASE_URL
//const BASE_URL = (true) ? 'https://admin.unite.unifyed.co.in:3003' : 'https://admin.unite.unifyed.com:3003';

console.log(`Admin URL is ${BASE_URL}`);

/** @param {string} resource */
const getAll = (resource) => {
    return axios.get(`${BASE_URL}/${resource}`).then(handleResponse).catch(handleError);
};

/** @param {string} resource */
/** @param {string} id */
const getSingle = (resource, id) => {
    return axios.get(`${BASE_URL}/${resource}/${id}`).then(handleResponse).catch(handleError);
};

/** @param {string} resource */
/** @param {object} model */
const post = (resource, model, headers) => {
    return axios.post(`${BASE_URL}/${resource}`, model, headers).then(handleResponse).catch(handleError);
};

/** @param {string} resource */
/** @param {object} model */
const put = (resource, model) => {
    return axios.put(`${BASE_URL}/${resource}`, model).then(handleResponse).catch(handleError);
};

/** @param {string} resource */
/** @param {object} model */
const patch = (resource, model) => {
    return axios.patch(`${BASE_URL}/${resource}`, model).then(handleResponse).catch(handleError);
};

/** @param {string} resource */
/** @param {string} id */
const remove = (resource, id) => {
    return axios.delete(`${BASE_URL}/${resource}`, id).then(handleResponse).catch(handleError);
};

export const apiProvider = {
    getAll,
    getSingle,
    post,
    put,
    patch,
    remove,
    serverBaseUrl: BASE_URL,
};
