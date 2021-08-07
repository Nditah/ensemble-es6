import express from "express";
import { checkAuth, isValidUser, isValidSuperAdmin } from "../../middleware";
// eslint-disable-next-line import/named
import { fetchHandler, createHandler, updateHandler } from "./controller";

const router = express.Router();

/**
 * @api {get} /api/permissions?id={recordId} Retrieve one or all records
 * @apiName RetrievePermissions
 * @apiGroup Permission
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/permissions?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records  of permissible api routes user can access
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/permissions", [checkAuth, isValidUser], fetchHandler);

/**
 * @api {post} /api/permissions Create permissions
 * @apiName CreatePermission
 * @apiGroup Permission
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {ObjectId} id permission primaryKey
 * @apiParam {String} name Permission module name (required)
 * @apiParam {String} action Permission module action (required)
 * @apiParam {ObjectId} table Permission module table (required)
 * @apiParam {String} description Permission description api route (required)
 * @apiSuccess {Object} Permission Permission's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Permission not found.
 * @apiError 401 master access only.
 */
router.post("/permissions", [checkAuth, isValidSuperAdmin], createHandler);

/**
 * @api {put} /api/permissions/{recordId} Update permissions
 * @apiName UpdatePermission
 * @apiGroup Permission
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {ObjectId} id permission primaryKey
 * @apiParam {String} name Permission module name (required)
 * @apiParam {String} action Permission module action (required)
 * @apiParam {ObjectId} table Permission module table (required)
 * @apiParam {String} description Permission description api route (required)
 * @apiSuccess {Object} Permission Permission's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Permission not found.
 * @apiError 401 master access only.
 */
router.put(
  "/permissions/:recordId",
  [checkAuth, isValidSuperAdmin],
  updateHandler
);

export default router;
