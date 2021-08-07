/* eslint-disable import/no-cycle */
/**
 * @author Nditah
 * @property {ObjectId} id permission primaryKey
 * @property {String} name Permission module name (required)
 * @property {String} action Permission module action (required)
 * @property {ObjectId} table Permission module table (required)
 * @property {String} description Permission description api route (required)
 */

import Joi from "joi";
import mongoose from "mongoose";
import { DATABASE } from "../../constants";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const ACTION = ["CREATE", "READ", "UPDATE", "DELETE", "HIDE"];

export const validateCreate = Joi.object({
  name: Joi.string().trim().required(),
  action: Joi.string()
    .trim()
    .valid(...ACTION)
    .required(),
  table: Joi.string().trim().required(),
  description: Joi.string().required(),
  createdBy: Joi.string()
    .regex(DATABASE.OBJECT_ID_REGEX, "valid objectID")
    .required(),
});

export const validateUpdate = Joi.object({
  name: Joi.string().trim().optional(),
  action: Joi.string()
    .trim()
    .valid(...ACTION)
    .optional(),
  table: Joi.string().trim().optional(),
  description: Joi.string().optional(),
  updatedBy: Joi.string()
    .regex(DATABASE.OBJECT_ID_REGEX, "valid objectID")
    .required(),
});

export const schema = {
  name: { type: String, trim: true, unique: true },
  action: {
    type: String,
    enum: ACTION,
    required: true,
  },
  table: { type: ObjectId, required: true, ref: "Table" },
  description: { type: String, required: true },
  createdBy: { type: ObjectId, ref: "User", required: true, select: false },
  updatedBy: { type: ObjectId, ref: "User", select: false },
  deleted: { type: Boolean, default: false, select: false },
  deletedAt: { type: Date, select: false },
  deletedBy: { type: ObjectId, ref: "User", select: false },
  erp: { type: Number, default: DATABASE.ERP_VERSION, select: false },
};

const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set("collection", "permission");

const Permission = mongoose.model("Permission", newSchema);

export default Permission;
