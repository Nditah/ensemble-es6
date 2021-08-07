import express from "express";
import { checkAuth, isValidUser } from "../../middleware";
import {
  fetchRecordPublic,
  fetchHandler,
  createHandler,
  updateHandler,
  patchHandler,
} from "./controller";

const router = express.Router();

/**
 * @api {get} /api/settings/public Retrieve Public Settings record(s)
 * @apiName RetrievePublicSetting
 * @apiGroup Setting
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/settings?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records of Software adjustable and default parameters.
 * Labels and contents for the website are kept here.
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/settings/public", fetchRecordPublic);

/**
 * @api {get} /api/settings?id={recordId} Retrieve Settings record(s)
 * @apiName RetrieveSetting
 * @apiGroup Setting
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/settings", [checkAuth], fetchHandler);

/**
 * @api {put} /api/settings Create Settings record
 * @apiName CreateSetting
 * @apiGroup Setting
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} name Setting varaible name
 * @apiParam {String} access Setting "public", "private"
 * @apiParam {String} category Setting category of domains affected
 * @apiParam {String} value Setting value value
 * @apiParam {String} description Setting description
 * @apiSuccess {Object} Setting Setting's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Setting not found.
 */
router.post("/settings", [checkAuth, isValidUser], createHandler);

/**
 * @api {put} /api/settings/{recordId} Update Settings record
 * @apiName UpdateSetting
 * @apiGroup Setting
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} name Setting varaible name
 * @apiParam {String} access Setting "public", "private"
 * @apiParam {String} category Setting category of domains affected
 * @apiParam {String} value Setting value value
 * @apiParam {String} description Setting description
 * @apiSuccess {Object} Setting Setting's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Setting not found.
 * @apiError 401 master access only.
 */
router.put("/settings/:recordId", [checkAuth, isValidUser], updateHandler);

/**
 * @api {patch} /api/settings/{recordId} Patch settings
 * @apiName PatchSetting
 * @apiGroup Setting
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Setting not found.
 * @apiError 401 master access only.
 */
router.patch("/settings/:recordId", [checkAuth, isValidUser], patchHandler);

export default router;
