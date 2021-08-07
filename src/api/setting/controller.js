import {
  fetchRecordPublicService,
  fetchService,
  createService,
  updateService,
  patchService,
} from "./service";
import { response, success, fail, loging } from "../../util";

// Logging
const module = "Setting";

export async function fetchRecordPublic(req, res) {
  try {
    const entity = await fetchService(req.query);
    return response(res, 200, entity);
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `${err.message}`);
  }
}

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
  const data = req.body;
  try {
    const result = await createService(data);
    return success(res, 201, result, "");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `${err.message}`);
  }
}

export async function updateHandler(req, res) {
  const data = req.body;
  const { recordId } = req.params;
  try {
    const result = await updateService(recordId, data);
    return success(res, 200, result, "");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `${err.message}`);
  }
}

export async function patchHandler(req, res) {
  const data = req.body;
  const { recordId } = req.params;
  try {
    const result = await patchService(recordId, data);
    return success(res, 200, result, "");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `${err.message}`);
  }
}
