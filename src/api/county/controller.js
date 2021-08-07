import { response, success, fail, loging } from "../../util";
import {
  fetchService,
  createService,
  updateService,
  patchService,
  deleteService,
} from "./service";

const module = "County";

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
    const result = await createService(req.body, req.user);
    return success(res, 201, result, "County record created successfully!");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, err.message);
  }
}

export async function updateHandler(req, res) {
  try {
    const data = req.body;
    const { recordId } = req.params;
    const result = await updateService(recordId, data, req.user);
    return success(res, 200, result, "County record updated successfully!");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `Error updating County record. ${err.message}`);
  }
}

export async function patchHandler(req, res) {
  try {
    const { recordId } = req.params;
    const result = await patchService(recordId, req.body, req.user);
    return success(res, 200, result, "County record patched successfully!");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `Error patching County record. ${err.message}`);
  }
}

export async function deleteHandler(req, res) {
  try {
    const result = await deleteService(req.params.recordId, req.user);
    return success(res, 200, result, "County record deleted successfully!");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `Error deleting County record. ${err.message}`);
  }
}
