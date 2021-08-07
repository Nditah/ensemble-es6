import { response, success, fail, loging } from "../../util";
import {
  fetchService,
  createService,
  updateService,
  patchService,
  deleteService,
} from "./service";
import { getToken } from "../../middleware";

const module = "Country";

export async function fetchHandler(req, res) {
  try {
    const entity = await fetchService(req.query);
    return response(res, 200, entity);
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, err.message);
  }
}

export async function createHandler(req, res) {
  try {
    const jwtToken = getToken(req);
    const result = await createService(req.body, jwtToken);
    return success(res, 201, result, "Country record created successfully!");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, err.message);
  }
}

export async function updateHandler(req, res) {
  try {
    const data = req.body;
    const { recordId } = req.params;
    const jwtToken = getToken(req);
    const result = await updateService(recordId, data, jwtToken);
    return success(res, 200, result, "Country record updated successfully!");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `Error updating Country record. ${err.message}`);
  }
}

export async function patchHandler(req, res) {
  try {
    const { recordId } = req.params;
    const jwtToken = getToken(req);
    const result = await patchService(recordId, req.body, jwtToken);
    return success(res, 200, result, "Country record patched successfully!");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `Error patching Country record. ${err.message}`);
  }
}

export async function deleteHandler(req, res) {
  try {
    const jwtToken = getToken(req);
    const result = await deleteService(req.params.recordId, jwtToken);
    return success(res, 200, result, "Country record deleted successfully!");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `Error deleting Country record. ${err.message}`);
  }
}
