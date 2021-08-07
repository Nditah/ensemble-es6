import {
  fetchService,
  createService,
  updateAdminService,
  patchService,
  deleteService,
  updateSelfService,
  updateAllUser,
  updateSecurity,
} from "./service";
import { response, success, fail, loging, getRequestIp } from "../../util";
import { loginService, sendOTPService } from "../../services";
import { USER_TYPE } from "../../constants";

const module = "User";

export async function fetchHandler(req, res) {
  try {
    const entity = await fetchService(req.query);
    return response(res, 200, entity);
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, err.message);
  }
}

export async function fetchMeHandler(req, res) {
  try {
    const { fields } = req.query;
    let query = `_id=${req.user.id}`;
    query += "&populate=role,role.permissions,terminal";
    if (fields) query += `&fields=${fields}`;
    let result = await fetchService(query);
    result = { id: req.user.id, ...result.payload[0] };
    return success(res, 200, result);
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, err.message);
  }
}

export async function fetchAuthHandler(req, res) {
  try {
    let query = `_id=${req.user.id}&fields=email,phone,access,role,wallet`;
    const result = await fetchService(query);
    return success(res, 200, result.payload[0]);
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, err.message);
  }
}

export async function createHandler(req, res) {
  try {
    const result = await createService(req.body, req.user);
    return success(res, 201, result, "");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `Error creating User record. ${err.message}`);
  }
}

export async function updateAdminHandler(req, res) {
  try {
    const result = await updateAdminService(req.params.recordId, req.body);
    return success(res, 200, result, "");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `${err.message}`);
  }
}

export async function updateMeHandler(req, res) {
  try {
    const result = await updateSelfService(req.body, req.user);
    return success(res, 200, result, "");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `${err.message}`);
  }
}

export async function patchHandler(req, res) {
  try {
    const result = await patchService(req.params.recordId, req.body);
    return success(res, 200, result, "");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `Error patching User record. ${err.message}`);
  }
}

export async function deleteHandler(req, res) {
  try {
    const result = await deleteService(req.params.recordId);
    return success(res, 200, result, "");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `Error patching User record. ${err.message}`);
  }
}

export async function loginHandler(req, res) {
  try {
    if (!req.body.currentIp) req.body.currentIp = getRequestIp(req);
    const result = await loginService(req.body);
    return success(res, 201, result, "Login was successful!");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 403, `${err.message}`);
  }
}

export async function sendOTPHandler(req, res) {
  try {
    await sendOTPService(req.body);
    return success(res, 200, {}, "OTP sent successfully!");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `${err.message}`);
  }
}

export async function updateSecurityHandler(req, res) {
  try {
    const { recordId } = req.params;
    const result = await updateSecurity(recordId, req.body);
    return success(res, 200, result, "");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `${err.message}`);
  }
}

export async function updateSelfHandler(req, res) {
  try {
    const { recordId } = req.params;
    const result = await updateSelfService(recordId, req.body);
    return success(res, 200, result, "");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `${err.message}`);
  }
}

export async function updateAllHandler(req, res) {
  try {
    const result = await updateAllUser();
    return success(res, 200, result, "");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `${err.message}`);
  }
}
