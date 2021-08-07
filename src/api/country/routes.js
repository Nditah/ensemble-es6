import express from "express";
import { checkAuth, isValidUser } from "../../middleware";
import {
  fetchHandler,
  createHandler,
  updateHandler,
  patchHandler,
  deleteHandler,
} from "./controller";

const router = express.Router();

/**
 * @api {get} /api/countries?id={recordId} Retrieve one or all records
 * @apiName RetrieveCountry
 * @apiGroup Country
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/countries?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Handlers countries of operation
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/countries", fetchHandler);

/**
 * @api {post} /api/countries Create countries
 * @apiName CreateCountry
 * @apiGroup Country
 * @apiParam {String} name Country name
 * @apiParam {String} iso2 Country iso where the state is located
 * @apiParam {String} iso3 Country iso3 (required)
 * @apiParam {String} callingCodes Country callingCodes (required)
 * @apiParam {String} currencies Country currencies (required)
 * @apiParam {String} ioc Country ioc (required)
 * @apiParam {String} languages Country languages (required)
 * @apiParam {String} status Country status (required)
 * @apiParam {ObjectId} createdBy Country record created by
 * @apiParam {ObjectId} updatedBy Country record modified by
 * @apiSuccess {Object} Country Country's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Country not found.
 * @apiError 401 master access only.
 */
router.post("/countries", [checkAuth, isValidUser], createHandler);

/**
 * @api {put} /api/countries/{recordId} Update countries
 * @apiName UpdateCountry
 * @apiGroup Country
 * @apiPermission master
 * @apiParam {String} name Country name
 * @apiParam {String} iso2 Country iso where the state is located
 * @apiParam {String} iso3 Country iso3 (required)
 * @apiParam {String} callingCodes Country callingCodes (required)
 * @apiParam {String} currencies Country currencies (required)
 * @apiParam {String} ioc Country ioc (required)
 * @apiParam {String} languages Country languages (required)
 * @apiParam {String} status Country status (required)
 * @apiParam {ObjectId} createdBy Country record created by
 * @apiParam {ObjectId} updatedBy Country record modified by
 * @apiSuccess {Object} Country Country's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Country not found.
 * @apiError 401 master access only.
 */
router.put("/countries/:recordId", [checkAuth, isValidUser], updateHandler);

/**
 * @api {patch} /api/countries/{recordId} Patch countries
 * @apiName PatchCountry
 * @apiGroup Country
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Country not found.
 * @apiError 401 master access only.
 */
router.patch("/countries/:recordId", [checkAuth, isValidUser], patchHandler);

/**
 * @api {delete} /api/countries/{recordId} Delete countries
 * @apiName DeleteCountry
 * @apiGroup Country
 * @apiPermission master
 * @apiParam {String} accessToken master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Country not found.
 * @apiError 401 master access only.
 */
router.delete("/countries/:recordId", [checkAuth, isValidUser], deleteHandler);

export default router;
