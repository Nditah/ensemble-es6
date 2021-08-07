import express from "express";
import { checkAuth, isValidUser } from "../../middleware";
import { fetchHandler, createHandler, updateHandler } from "./controller";

const router = express.Router();

/**
 * @api {get} /api/roles?id={recordId} Retrieve one or all records
 * @apiName RetrieveRoles
 * @apiGroup Role
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i api/roles?
 * @apiParam {Object} filter query condition (optional)
 * @apiParam {Number} skip Number of records to offset by (optional)
 * @apiParam {Number} limit Maximum Number of records to retrieve (optional)
 * @apiParam {String} sort how records would be arranged in alphabet (optional)
 * @apiParam {String} projection list of record's attributes to retrieve (optional)
 * @apiDescription Records  of permissible api routes user can access
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/roles", [checkAuth, isValidUser], fetchHandler);

/**
 * @api {post} /api/roles Create roles
 * @apiName CreateRole
 * @apiGroup Role
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} name Role module name (required)
 * @apiParam {String} description Role description api route (required)
 * @apiParam {Array} permissions Role permissions
 * @apiSuccess {Object} Role Role's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Role not found.
 * @apiError 401 master access only.
 */
router.post("/roles", [checkAuth, isValidUser], createHandler);

/**
 * @api {put} /api/roles/{recordId} Update roles
 * @apiName UpdateRole
 * @apiGroup Role
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} name Role module name (required)
 * @apiParam {String} description Role description api route (required)
 * @apiParam {Array} permissions Role permissions
 * @apiSuccess {Object} Role Role's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Role not found.
 * @apiError 401 master access only.
 */
router.put("/roles/:recordId", [checkAuth, isValidUser], updateHandler);

export default router;
