/**
 * @author Nditah
 * @property {ObjectId} id Setting primaryKey
 * @property {String} name Setting varaible name
 * @property {String} access Setting "public", "private"
 * @property {String} category Setting category of domains affected
 * @property {String} value Setting value value
 * @property {String} description Setting description
 * @description Setting holds record of all cities with terminals
 */
import Joi from "joi";
import mongoose from "mongoose";
import { DATABASE } from "../../constants";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const schemaFetch = {
  names: Joi.string().optional(),
  fields: Joi.string().optional(),
};

export const validateCreate = Joi.object({
  name: Joi.string().trim().optional(),
  access: Joi.string().trim().valid("public", "private").default("private"),
  value: Joi.string().trim().optional(),
  category: Joi.string().optional(),
  description: Joi.string().optional(),
  createdBy: Joi.string()
    .regex(DATABASE.OBJECT_ID_REGEX, "valid objectID")
    .required(),
});

export const validateUpdate = Joi.object({
  name: Joi.string().trim().optional(),
  access: Joi.string().trim().valid("public", "private").optional(),
  value: Joi.string().trim().optional(),
  category: Joi.string().optional(),
  description: Joi.string().optional(),
  updatedBy: Joi.string()
    .regex(DATABASE.OBJECT_ID_REGEX, "valid objectID")
    .required(),
});

export const schema = {
  name: {
    type: String,
    uppercase: true,
    unique: true,
    required: [true, "Why no name?"],
  },
  access: { type: String, enum: ["public", "private"], required: true },
  value: { type: String, required: [true, "Why no value?"] },
  category: { type: String },
  description: { type: String, required: [true, "Why no description?"] },
  updatedBy: { type: ObjectId, ref: "User" },
  erp: { type: Number, default: DATABASE.ERP_VERSION, select: false },
};

const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.index({ name: 1 }, { unique: true });
newSchema.set("collection", "setting");

const Setting = mongoose.model("Setting", newSchema);

export default Setting;
