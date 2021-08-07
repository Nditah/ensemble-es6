import express from "express";
import { checkAuth, isUser, isValidUser } from "../../middleware";
import {
  fetchHandler,
  fetchMeHandler,
  createHandler,
  updateAdminHandler,
  deleteHandler,
  loginHandler,
  patchHandler,
  sendOTPHandler,
  updateAllHandler,
  updateMeHandler,
  fetchAuthHandler,
  updateSelfHandler,
  updateSecurityHandler,
} from "./controller";

const router = express.Router();

/**
 * @api {get} /erp/user?id={recordId} Retrieve User records
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiHeader {String} Authorization Bearer token
 * @apiExample {curl} Example usage for retieving a single record:
 *      curl -i erp/user?
 * @apiParam {Object} filter query condition
 * @apiParam {Number} skip Number of records to offset by
 * @apiParam {Number} limit Maximum Number of records to retrieve
 * @apiParam {String} sort how records would be arranged in alphabet
 * @apiParam {String} projection list of record's attributes to retrieve
 * @apiDescription Records of user distributed across terminals.
 * @apiSuccess {Object[]} Array of Objects of records.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/user", [checkAuth, isValidUser], fetchHandler);
router.get("/user/me", [checkAuth], fetchMeHandler);
router.get("/user/update", [checkAuth, isValidUser], updateAllHandler);
router.get("/user/auth", [checkAuth], fetchAuthHandler);

/**
 * @api {post} /erp/user Create a User record
 * @apiName CreateUser
 * @apiGroup User
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} serial User serial
 * @apiParam {String} title User title
 * @apiParam {String} surname User surname (required)
 * @apiParam {String} otherName User other name (required)
 * @apiParam {String} gender User gender (required)
 * @apiParam {Date} birthDate User birth date (required)
 * @apiParam {String} maritalStatus User marital status (required)
 * @apiParam {Number} children User Number of children
 * @apiParam {String} phone User office phone (required)
 * @apiParam {String} phoneHome User phone personal
 * @apiParam {String} emailPersonal User personal email Address
 * @apiParam {String} address User address
 * @apiParam {String} village User village
 * @apiParam {ObjectId} state User state (required)
 * @apiParam {ObjectId} county User county (required)
 * @apiParam {String} country User country (required)
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiParam {String} otp User otp
 * @apiParam {Number} otpCount User otp count
 * @apiParam {Boolean} otpAccess User OTP Access Status
 * @apiParam {String} kin User kin (required)
 * @apiParam {String} kinPhone User kin phone (required)
 * @apiParam {String} kinAddress User kin address (required)
 * @apiParam {String} profession User profession
 * @apiParam {String} qualification User qualification
 * @apiParam {String} institution User institution
 * @apiParam {String} employment User employment status (required)
 * @apiParam {String} tin User tin Tax Identification Number
 * @apiParam {ObjectId} bank User bank
 * @apiParam {String} bankAccountNumber User bank account number
 * @apiParam {String} bankAccountName User bank account name
 * @apiParam {String} rank User rank
 * @apiParam {ObjectId} office User office
 * @apiParam {ObjectId} role User role is an array of permissions the office demands
 * @apiParam {ObjectId} superior User superior id (required)
 * @apiParam {String} subsidiary User subsidiary (required)
 * @apiParam {ObjectId} terminal User terminal (required)
 * @apiSuccess {Object} User User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 * @apiError 401 master access only.
 */
router.post("/user", [checkAuth, isValidUser], createHandler);

/**
 * @api {put} /erp/user/{recordId} Update a User record
 * @apiName UpdateUser
 * @apiGroup User
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} serial User serial
 * @apiParam {ObjectId} category User Category
 * @apiParam {String} title User title
 * @apiParam {String} surname User surname (required)
 * @apiParam {String} otherName User other name (required)
 * @apiParam {String} gender User gender (required)
 * @apiParam {Date} birthDate User birth date (required)
 * @apiParam {String} maritalStatus User marital status (required)
 * @apiParam {Number} children User Number of children
 * @apiParam {String} phone User office phone (required)
 * @apiParam {String} phoneHome User phone personal
 * @apiParam {String} emailPersonal User personal email Address
 * @apiParam {String} address User address
 * @apiParam {String} village User village
 * @apiParam {ObjectId} state User state (required)
 * @apiParam {ObjectId} county User county (required)
 * @apiParam {String} country User country (required)
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiParam {String} otp User otp
 * @apiParam {Number} otpCount User otp count
 * @apiParam {Boolean} otpAccess User OTP Access Status
 * @apiParam {String} kin User kin (required)
 * @apiParam {String} kinPhone User kin phone (required)
 * @apiParam {String} kinAddress User kin address (required)
 * @apiParam {String} profession User profession
 * @apiParam {String} qualification User qualification
 * @apiParam {String} institution User institution
 * @apiParam {String} employment User employment status (required)
 * @apiParam {String} tin User tin Tax Identification Number
 * @apiParam {ObjectId} bank User bank
 * @apiParam {String} bankAccountNumber User bank account number
 * @apiParam {String} bankAccountName User bank account name
 * @apiParam {String} rank User rank
 * @apiParam {ObjectId} office User office
 * @apiParam {ObjectId} role User role is an array of permissions the office demands
 * @apiParam {ObjectId} superior User superior id (required)
 * @apiParam {String} subsidiary User subsidiary (required)
 * @apiParam {ObjectId} terminal User terminal (required)
 * @apiParam {ObjectId} currentVehicle User currentVehicle
 * @apiParam {Array} assignments array of Objects of Asset Assigmnet History
 * managed my Asset Manager (prohibited)
 * @apiParam {Boolean} isAssignedVehicle User is assigned a vehicle
 * @apiParam {String} notice User notice
 * @apiParam {Array} ratings User ratings
 * @apiParam {Array} notifications User notifications
 * @apiParam {String} remark User remark
 * @apiParam {String} photo User photo
 * @apiParam {Boolean} isSalaryPayable User is salary payable
 * @apiParam {Boolean} isDocumented User is document complete
 * @apiParam {Number} access User access level 0 - 9 Max. Zero implies No access
 * @apiParam {String} status User employment approval status
 * @apiParam {Date} rejectedDate User employment rejected date
 * @apiParam {ObjectId} rejectedBy User employment rejected By
 * @apiParam {Date} lastLogin User lastLogin
 * @apiParam {Date} currentLogin User currentLogin
 * @apiParam {String} lastIp User lastIp
 * @apiParam {String} currentIp User currentIp
 * @apiParam {ObjectId} createdBy User record created by
 * @apiParam {ObjectId} updatedBy User record modified by
 * @apiSuccess {Object} User User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 User not found.
 * @apiError 401 master access only.
 */
router.put("/user/:recordId", [checkAuth, isValidUser], updateAdminHandler);
router.put("/user/me/:recordId", [checkAuth], updateMeHandler);

router.put("/user/self/:recordId", [checkAuth], updateSelfHandler);

router.put("/user/security/:recordId", [checkAuth], updateSecurityHandler);
/**
 * @api {patch} /erp/user/{recordId} Patch user
 * @apiName PatchUser
 * @apiGroup User
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required record ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 User not found.
 * @apiError 401 master access only.
 */
router.patch("/user/:recordId", [checkAuth, isValidUser], patchHandler);

/**
 * @api {delete} /erp/user/{recordId} Delete a User record
 * @apiName DeleteUser
 * @apiGroup User
 * @apiHeader {String} Authorization Bearer token
 * @apiParam {String} recordId required user ObjectId
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 User not found.
 * @apiError 401 master access only.
 */
router.delete("/user/:recordId", [checkAuth, isValidUser], deleteHandler);

/**
 * @api {post} /erp/user/login Login User
 * @apiName LoginUser
 * @apiGroup User
 * @apiParam {String} recordId User Id (required)
 * @apiParam {String} email User email address
 * @apiParam {String} password User password
 * @apiParam {String} officePhone User official phone number
 * @apiParam {String} otp User One-Time-Password sent to phone
 * @apiParam {String} type Login type "EMAIL", "PHONE", "OTP" (required)
 * @apiSuccess (Success 200) 200 Login Successful.
 * @apiError 404 User not found.
 */
router.post("/user/login", loginHandler);

/**
 * @api {post} /erp/user/otp ForgotPassword User
 * @apiName ForgotUser
 * @apiGroup User
 * @apiParam {String} email User email address (required)
 * @apiParam {String} phone User official phone # (required)
 * @apiSuccess (Success 200) 200 Login Successful.
 * @apiError 404 User not found.
 */
router.post("/user/otp", sendOTPHandler);

export default router;
