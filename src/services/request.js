import rp from "request-promise";
import dotenv from "dotenv";
import { cleanObject } from "../util";

dotenv.config();

let apiUrl = process.env.GATEWAY_URL || "http://localhost/api";
const apiKey = process.env.API_KEY;
/**
 * @description exRequest external request function executes foreign http request
 * @param {String} jwtToken token string
 * @param {Enum} httpMethod request method GET|POST|PUT|PATCH|DELETE
 * @param {String} httpUrl url sting
 * @param {Object} data payload object
 */
export function exRequest(httpMethod, httpUrl = "", data = {}, jwtToken) {
    // const token = getToken(jwtToken);
    const headersObj = {
        Accept: "application/json",
        "Content-Type": "application/json",
        json: true,
    };
    const payload = cleanObject(data);
    const options = {
        method: httpMethod,
        uri: httpUrl,
        body: payload,
        headers: headersObj,
        auth: { bearer: jwtToken }, // { 'user': 'myusername', 'pass': 'mypassword' },
        json: true, // Automatically stringifies the body to JSON
    };
    return rp(options).then(response => response).catch(err => err.error);
}

/**
 * @description function to execute external http request
 * @param {String} jwtToken token string
 * @param {Enum} httpMethod request method GET|POST|PUT|PATCH|DELETE
 * @param {String} path url path string
 * @param {Object} data payload object
 */
export function myRequest(httpMethod, path = "", data = {}, jwtToken = "") {
    // const token = getToken(req);
    // const requestHash = req.headers.apiKey || req.query.apiKey;

    const headersObj = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": "Erp-Agent",
        json: true,
    };
    const payload = cleanObject(data);
    const options = {
        method: httpMethod,
        uri: apiUrl + path,
        body: payload,
        headers: headersObj,
        qs: { apiKey },
        auth: { bearer: jwtToken }, // { 'user': 'myusername', 'pass': 'mypassword' },
        json: true, // Automatically stringifies the body to JSON
    };
    return rp(options).then(response => response).catch(err => err.error);
}

export async function getData(url, jwtToken) {
    try {
        const result = await myRequest("GET", url, {}, jwtToken);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

export async function postData(url, data, jwtToken) {
    try {
        const result = await myRequest("POST", url, data, jwtToken);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

export async function putData(url, data, jwtToken) {
    try {
        const result = await myRequest("PUT", url, data, jwtToken);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

export async function patchData(url, data, jwtToken) {
    try {
        const result = await myRequest("PATCH", url, data, jwtToken);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

export async function deleteData(url, jwtToken) {
    try {
        const result = await myRequest("DELETE", url, {}, jwtToken);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}
