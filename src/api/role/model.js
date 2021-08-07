/**
 * @author Nditah
 * @property {ObjectId} id permission primaryKey
 * @property {String} name Role module name (required)
 * @property {String} description Role description api route (required)
 * @property {Array} permissions Role permissions
 * @description Role model holds record of permissible api routes user can permission
 */
import Joi from "joi";
import mongoose from "mongoose";
import { DATABASE } from "../../constants";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const validateCreate = Joi.object({
  name: Joi.string().trim().required(),
  permissions: Joi.array().optional(),
  description: Joi.string().required(),
  createdBy: Joi.string()
    .regex(DATABASE.OBJECT_ID_REGEX, "valid objectID")
    .required(),
});

export const validateUpdate = Joi.object({
  name: Joi.string().trim().optional(),
  permissions: Joi.array().optional(),
  description: Joi.string().optional(),
  updatedBy: Joi.string()
    .regex(DATABASE.OBJECT_ID_REGEX, "valid objectID")
    .required(),
});

export const schema = {
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  permissions: [{ type: ObjectId, ref: "Permission" }],
  createdBy: { type: ObjectId, ref: "User", required: true, select: false },
  updatedBy: { type: ObjectId, ref: "User", select: false },
  deleted: { type: Boolean, default: false, select: false },
  deletedAt: { type: Date, select: false },
  deletedBy: { type: ObjectId, ref: "User", select: false },
  erp: { type: Number, default: DATABASE.ERP_VERSION, select: false },
};

const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set("collection", "role");

const Role = mongoose.model("Role", newSchema);

export default Role;
