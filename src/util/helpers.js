import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

export function hash(str = "") {
    return bcryptjs.hashSync(str, 2);
}

export const parseId = result => JSON.parse(JSON.stringify(result).replace(/_id/g, "id"));

export function safeGet(obj, prop, empty = "") {
    if(obj == null) return empty;
    return Object.assign({}, obj)[prop] || empty;
}

export function toObjectId(ids) {
    if (ids.constructor === Array) {
        return ids.map(mongoose.Types.ObjectId);
    }
    return mongoose.Types.ObjectId(ids);
}

/**
 * generateObjectId() creates a uuid for a record using the terminalId
 * @param {string} terminal ObjectId
 */
export function generateObjectId(terminal = "5c51bc91860d8b5bc0000001") {
    const presently = Date.now();
    const last3Chars = terminal.substr(terminal.length - 3);
    const str1 = genString(4, "abcdef");
    const str2 = genString(4, "abcdef");
    const id = str1 + presently + str2 + last3Chars;
    return id;
}

export function setLimit(inputlimit = 100) {
    const limit = parseInt(inputlimit, 10);
    // eslint-disable-next-line no-restricted-globals
    return (isNaN(limit) || limit == null || limit > 100 || limit === 0) ? 100 : limit;
}


export const generateEmail = (person) => {
    const { surname, otherName } = person;
    const email = (otherName).trim().split(" ");
    return (`${surname}.${email[0]}@pmt.ng`).toLowerCase();
  }

export function timestamp() {
    return `${new Date().toISOString().slice(0, 22)}Z`;
    //   return new Date().toISOString().slice(0, 19).replace("T", " ")+"Z";
}

export function dateDaysAgo(since = 0) {
    const today = new Date();
    today.setDate(today.getDate() - since);
    return today.toISOString();
}

/**
 * @description daysSince returns number of days passed since eventDate 
 * @param {Date} eventDate 
 */
export function daysSince(eventDate) {
    const today = new Date();
    const eventOn = new Date(eventDate);
    const msInDay = 24 * 60 * 60 * 1000;

    eventOn.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diff = (+today) - (+eventOn);
    return diff / msInDay;
}

export function randomNum() {
    return Math.floor(Math.random() * 1000000);
}

export function cloneObject(model = {}, source) {
    return Object.assign(model, source);
}

/**
 * @description getObjectByKey returns the object from an Array of
 * Objects that has the key with a given value or undefined!
 * @param {Array} arrayObject Array of Objects
 * @param {String} key Object key could be a String or Integer
 * @param {String} value Object value could be a String or Integer
 */
export function getObjectByKey(arrayObject, key, value) {
    return arrayObject.find(obj => obj[ key ] === value);
}

export function getSettings(arrObj = [{}], value = "") {
    const Obj = arrObj.find(item => item.name === value);
    if (Obj) {
        return Obj.value;
    }
    return 0;
}

/**
 * @description addToArrayOfObjects add a new object item to an array of objects
 * @param {Object} arrayOfObjects the array of object
 * @param {Number} limit maximum number of objects the array should not exceed
 * @param {Object} newObjectElement the new item to be added to the array of objects
 * @returns {Object} the new array of Objects
 */
export default function addToArrayOfObjects(arrayOfObjects, limit, newObjectElement) {
    const size = Object.keys(arrayOfObjects).length;
    if (size < limit) {
        arrayOfObjects.push(newObjectElement);
    } else {
    // arr.splice(indexToRemove, numToRemove)
        arrayOfObjects.splice(0, 1);
        arrayOfObjects.push(newObjectElement);
    }
    return arrayOfObjects;
}

/**
 * @description getClientAccess get the Ip Address and TimeSTamp of a request object.
 * @param {String} req the request object
 * @returns {Object} { accessDate, ipAddress } access date and the ip address
 */
export function getClientAccess(req) {
    const ipAddress = req.ip || req._remoteAddress;
    // const lang = req.get("accept-language");
    const accessDate = req._startTime || "";
    return { accessDate, ipAddress };
}

export function isRealValue(object) {
    return typeof object !== "undefined" || object !== null;
}

export function hasProp(obj, prop) {
    if (!isRealValue(obj)) return false;
    return (obj[ prop ] !== undefined);
    // return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function isObjecId(id) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) return true;
    return false;
}

/**
 * @returns a six-digit random number
 */
export function generateOtp() {
    const num = Math.floor(Math.random() * 900000) + 100000;
    return num;
}

export function cleanDeepObject(obj) {
    // eslint-disable-next-line no-restricted-syntax
    for (const propName in obj) {
        if (!obj[ propName ] || obj[ propName ].length === 0) {
            delete obj[ propName ];
        } else if (typeof obj === "object") {
            cleanDeepObject(obj[ propName ]);
        }
    }
    return obj;
}

let depth = 0;

// eslint-disable-next-line complexity
export function cleanObject(obj) {
    depth += 1;
    // eslint-disable-next-line no-restricted-syntax
    for (const propName in obj) {
        if (!obj[ propName ] || obj[propName] === null || obj[propName] === undefined || obj[ propName ].length === 0) {
            delete obj[ propName ];
        } else if (typeof obj === "object") {
            if (depth <= 3) cleanObject(obj[ propName ]);
        }
    }
    return obj;
}

/**
 * @description a function that removes duplicates from an array of objects
 * @param {Array} arrayOfObj an array of objects with duplicate value for
 *  a given property
 * @param {String} prop the property with duplicate values that renneds to be filtered by
 */
export function removeDuplicates(arrayOfObj, prop) {
    const setOfSeenObj = new Set();
    const filteredArr = arrayOfObj.filter((item) => {
        const duplicate = setOfSeenObj.has(item[ prop ]);
        setOfSeenObj.add(item[ prop ]);
        return !duplicate;
    });
    return filteredArr;
}

export function nextDate(d = 1, givenDate = new Date().toISOString()) {
    return new Date(new Date(givenDate).setDate(new Date(givenDate).getDate() + d));
}

export function genString(length, possible = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789") {
    let text = "";
    const str = possible || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
        text += str.charAt(Math.floor(Math.random() * str.length));
    }
    return text;
}

function daysIntoYear(date = new Date()) {
    // eslint-disable-next-line max-len
    return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

export function genCode(len = 9) {
    let d = new Date().getFullYear().toString().substr(-2);
    d += daysIntoYear();
    if (len - d.length > 0) {
        return d + genString(len - d.length);
    }
    return genString(len);
}

export function generateCode(terminalId="5c51bc91860d8b5ac0000001", len = 10) {
    let d = new Date().getFullYear().toString().substr(-1);
    d += daysIntoYear();
    d += terminalId.substr(-2);
    if (len - d.length > 0) {
        return d + genString(len - d.length, "0987654321");
    }
    return genString(len, "0987654321");
}

export function hasNull(Obj = {}) {
    const val = Object.values(Obj);
    if (val.includes(null) || val.includes(undefined) || val.includes("")) return true;
    return false;
}

export function formatPhone(phone) {
    if (!phone) return null;
    let str = phone.trim();
    if (str.length === 11 && str[ 0 ] === "0") {
        str = `+234${str.slice(1)}`;
    }
    if (str.length === 10) {
        str = `+234${str}`;
    }
    return str;
}

export function stringToArrayPhone(str) {
    const arr = str.split(",").map(st => st.trim()) || []; // remove spaces
    const filtered = arr.filter((value, index) => (value.length >= 11 && value.length < 15));
    return [...new Set(filtered)]; // Remove duplicates
}

export function getRequestIp(request) {
    let ipAddr = request.connection.remoteAddress;
    if (request.headers && request.headers[ "x-forwarded-for" ]) {
        [ipAddr] = request.headers[ "x-forwarded-for" ].split(",");
    }
    return ipAddr;
}

// eslint-disable-next-line complexity
export function getFullname(record) {
    if (!record) return "";
    const title = hasProp(record, "title") ? record.title : "";
    const gender = hasProp(record, "gender") ? `(${record.gender.charAt(0).toLowerCase()})` : "";
    const surname = hasProp(record, "surname") ? record.surname : "";
    const otherName = hasProp(record, "otherName") ? record.otherName : "";
    return (`${titleCase(`${title} ${surname} ${otherName}`)} ${gender}`).trim();
}

export function titleCase(str) {
    return str.toLowerCase().split(" ").map(word => (word.charAt(0).toUpperCase() + word.slice(1))).join(" ");
}

// eslint-disable-next-line complexity
export function calcTax(taxableIncome) {
    let income = taxableIncome;
    let taxTotal = 0;
    if (income >= 1) {
        const taxable = income - 300000 >= 0 ? 300000 : income;
        const tax = taxable * 7 / 100;
        taxTotal += tax;
        income -= taxable;
    }
    if (income >= 1) {
        const taxable = income - 300000 >= 0 ? 300000 : income;
        const tax = taxable * 11 / 100;
        taxTotal += tax;
        income -= taxable;
    }
    if (income >= 1) {
        const taxable = income - 500000 >= 0 ? 500000 : income;
        const tax = taxable * 15 / 100;
        taxTotal += tax;
        income -= taxable;
    }
    if (income >= 1) {
        const taxable = income - 500000 >= 0 ? 500000 : income;
        const tax = taxable * 19 / 100;
        taxTotal += tax;
        income -= taxable;
    }
    if (income >= 1) {
        const taxable = income - 1600000 >= 0 ? 1600000 : income;
        const tax = taxable * 21 / 100;
        taxTotal += tax;
        income -= taxable;
    }
    if (income >= 1) {
        const tax = income * 24 / 100;
        taxTotal += tax;
    }
    return taxTotal;
}
