import dotenv from "dotenv";
import mongoose from "mongoose";
import { verify } from "jsonwebtoken";
import { USER_TYPE, EMAIL } from "../constants";
import { fail, hasProp, safeGet, loging } from "../util";
import { getUser } from "../services";

const module = "Authenticated";

dotenv.config();

const JWT = {
  jwtSecret: process.env.JWT_SECRET,
  tokenExpireTime: process.env.JWT_EXPIRES,
};

// Retrieve token from request header
export function getToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  if (req.query && hasProp(req.query, "token")) {
    return req.query.token;
  }
  return null;
}

export async function checkAuth(req, res, next) {
  try {
    const token = getToken(req);
    if (!token) return fail(res, 403, "No token found in request header!");
    return verify(token, JWT.jwtSecret, async (err, decoded) => {
      try {
        if (err) return fail(res, 403, "Invalid token!");
        const person = await getUser(decoded.userType, decoded.id);
        const { enterprise, terminal, subsidiary, role, access } = person;
        req.user = {
          id: decoded.id,
          userType: decoded.userType,
          email: decoded.email,
          enterprise,
          terminal,
          subsidiary,
          access,
          role,
          token,
        };
        delete req.query.apiKey;
        return checkRequestMethod(req, res, next);
      } catch (error) {
        return fail(res, 400, `${error.message}`);
      }
    });
  } catch (err) {
    loging(module, req, err);
    return fail(res, 403, `${module} failed! ${err.message}`);
  }
}

function checkRequestMethod(req, res, next) {
  switch (req.method) {
    case "POST":
      req.body.createdBy = req.user.id;
      break;
    case "PUT":
      req.body.updatedBy = req.user.id;
      if (req.params.recordId) {
        if (!mongoose.Types.ObjectId.isValid(req.params.recordId)) {
          return fail(
            res,
            422,
            `Invalid object id as request parameter! ${req.params.recordId}`
          );
        }
      }
      break;
    case "PATCH":
      if (req.body.deleted === true || req.body.deleted === "true") {
        req.body = {};
        req.body.deleted = true;
        req.body.deletedAt = Date.now();
        req.body.deletedBy = req.user.id;
      }
      if (req.params.recordId) {
        if (!mongoose.Types.ObjectId.isValid(req.params.recordId)) {
          return fail(
            res,
            422,
            `Invalid object id as request parameter! ${req.params.recordId}`
          );
        }
      }
      break;
    case "DELETE":
      req.body = {};
      if (safeGet(req.user.role, "name") !== "SUPER_ADMIN") {
        return fail(
          res,
          403,
          "Insufficient user priveleges. Required: SUPER_ADMIN"
        );
      }
      if (req.params.recordId) {
        if (!mongoose.Types.ObjectId.isValid(req.params.recordId)) {
          return fail(
            res,
            422,
            `Invalid object id as request parameter! ${req.params.recordId}`
          );
        }
      }
      break;
    default:
  }
  return next();
}

export function isUser(req, res, next) {
  try {
    const { userType, email, role } = req.user;
    if (userType !== USER_TYPE.USER)
      return fail(res, 403, "Invalid User credentials!");
    if (email === EMAIL.ADMIN || safeGet(role, "name") === "SUPER_ADMIN")
      return next();
    if (!role)
      return fail(res, 403, "Invalid User credentials! No user-role found");
    return next();
  } catch (err) {
    loging(module, req, err);
    return fail(res, 403, `User not Validated! ${err.message}`);
  }
}

export function isValidUser(req, res, next) {
  try {
    const { userType, email, role } = req.user;
    if (userType !== USER_TYPE.USER)
      return fail(res, 403, "Invalid User credentials!");
    if (email === EMAIL.ADMIN || safeGet(role, "name") === "SUPER_ADMIN")
      return next();
    if (!role)
      return fail(res, 403, "Invalid User credentials! No user-role found");
    return isAuthorized(req, res, next);
  } catch (err) {
    loging(module, req, err);
    return fail(res, 403, `User not Validated! ${err.message}`);
  }
}

// eslint-disable-next-line complexity
export async function isAuthorized(req, res, next) {
  try {
    let reqAction;
    const { path, method } = req;
    switch (method) {
      case "POST":
        reqAction = "CREATE";
        break;
      case "PUT":
        reqAction = "UPDATE";
        break;
      case "PATCH":
        reqAction = "HIDE";
        break;
      case "DELETE":
        reqAction = "DELETE";
        break;
      case "GET":
        reqAction = "READ";
        break;
      default:
        reqAction = "READ";
        break;
    }
    const { name: roleName, permissions } = req.user.role;
    if (!permissions || !permissions.isArray())
      return fail(res, 403, "User has no permission");
    const resource = path
      .split("/", 2)[1]
      .replace(/-/g, "")
      .replace(/s$/, "")
      .toUpperCase();
    const requiredPermission = `${reqAction}_${resource}`;
    if (!permissionArray)
      return fail(
        res,
        403,
        "Invalid User credentials! No permission found - 101"
      );
    const permissionRecords = permissionArray.find(
      (item) => item.name === requiredPermission
    );
    const msg = `Invalid credentials! Role ${roleName} lacks permission ${requiredPermission}`;
    if (!permissionRecords) return fail(res, 403, msg);
    return next();
  } catch (err) {
    loging(module, req, err);
    return fail(res, 403, `User not Authorized! ${err.message}`);
  }
}

export function isValidPartner(req, res, next) {
  const { userType, id, email } = req.user;
  if (userType !== USER_TYPE.TRANSPORT_PARTNER)
    return fail(res, 403, "Invalid Partner credentials!");
  return next();
}

export function isValidDriver(req, res, next) {
  const { userType, id, email, vehicle } = req.user;
  if (userType !== "DRIVER")
    return fail(res, 403, "Invalid Partner credentials!");
  return next();
}

export function isValidSuperAdmin(req, res, next) {
  const { email, role } = req.user;
  if (email === EMAIL.ADMIN || role.name === "SUPER_ADMIN") return next();
  return fail(res, 403, "Insufficient user priveleges. Required: SUPER_ADMIN");
}

export function isValidApiHash(req, res, next) {
  const requestHash = req.headers.apiKey || req.query.apiKey;
  if (!requestHash) {
    return fail(res, 403, `Invalid api token. ${requestHash}`);
  }
  const apiKey = process.env.API_KEY;
  if (requestHash !== apiKey) {
    return fail(res, 403, `Invalid api token. ${requestHash}`);
  }
  delete req.query.apiKey;
  return next();
}
