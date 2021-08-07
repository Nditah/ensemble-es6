import { fetchService, createService, updateService } from "./service";
import { response, success, fail, loging } from "../../util";

// Logging
const module = "Role";

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
    const result = await createService(req.body);
    return success(res, 201, result, "");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `${err.message}`);
  }
}

export async function updateHandler(req, res) {
  try {
    const data = req.body;
    const { recordId } = req.params;
    const result = await updateService(recordId, data);
    return success(res, 200, result, "");
  } catch (err) {
    loging(module, req, err);
    return fail(res, 400, `${err.message}`);
  }
}
