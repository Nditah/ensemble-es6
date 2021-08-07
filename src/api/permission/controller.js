import { fetchService, createService, updateService } from "./service";
import { response, success, fail, loging } from "../../util";
import { getToken } from "../../middleware";

const module = "Permission";

export async function fetchHandler(req, res) {
  try {
    const entity = await fetchService(req.query);
    return response(res, 200, entity);
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `${err.message}`);
  }
}

export async function createHandler(req, res) {
  try {
    const data = req.body;
    const jwtToken = getToken(req);
    const result = await createService(data, jwtToken);
    return success(res, 201, result, "");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, err.message);
  }
}

// eslint-disable-next-line complexity
export async function updateHandler(req, res) {
  try {
    const data = req.body;
    const { recordId } = req.params;
    const jwtToken = getToken(req);
    const result = await updateService(recordId, data, jwtToken);
    return success(res, 200, result, "");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `${err.message}`);
  }
}

export async function patchHandler(req, res) {
  try {
    const data = req.body;
    const { recordId } = req.params;
    const jwtToken = getToken(req);
    const result = await patchService(recordId, data, jwtToken);
    return success(res, 200, result, "");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `${err.message}`);
  }
}

export async function deleteHandler(req, res) {
  try {
    const { recordId } = req.params;
    const jwtToken = getToken(req);
    const result = await deleteService(recordId, jwtToken);
    return success(res, 200, result, "");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `${err.message}`);
  }
}
