/**
 * @author Nditah
 * @property {ObjectId} id Country primaryKey
 * @property {String} name Country name
 * @property {String} iso2 Country iso where the state is located
 * @property {String} iso3 Country iso3 (required)
 * @property {String} callingCodes Country callingCodes (required)
 * @property {String} currency Country currency (required)
 * @property {String} ioc Country ioc (required)
 * @property {String} languages Country languages (required)
 * @property {String} status Country status (required)
 * @property {ObjectId} createdBy Country record created by
 * @property {ObjectId} updatedBy Country record modified by
 * @description Country holds record of all cities with terminalList
 */
import Joi from "joi";
import mongoose from "mongoose";
import { DATABASE } from "../../constants";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const validateCreate = Joi.object({
  name: Joi.string().trim().required(),
  iso2: Joi.string().trim().required(),
  iso3: Joi.string().trim().required(),
  callingCodes: Joi.string().required(),
  currency: Joi.string().required(),
  ioc: Joi.string().trim().required(),
  languages: Joi.string().required(),
  status: Joi.string().trim().required(),
  createdBy: Joi.string()
    .regex(DATABASE.OBJECT_ID_REGEX, "valid objectID")
    .required(),
});

export const validateUpdate = Joi.object({
  name: Joi.string().trim().optional(),
  iso2: Joi.string().trim().optional(),
  iso3: Joi.string().trim().optional(),
  callingCodes: Joi.string().optional(),
  currency: Joi.string().optional(),
  ioc: Joi.string().trim().optional(),
  languages: Joi.string().optional(),
  status: Joi.string().trim().optional(),
  updatedBy: Joi.string()
    .regex(DATABASE.OBJECT_ID_REGEX, "valid objectID")
    .required(),
});

export const schema = {
  name: { type: String, trim: true },
  iso2: { type: String, trim: true },
  iso3: { type: String, trim: true },
  callingCodes: { type: String, trim: true },
  currency: { type: String, trim: true },
  ioc: { type: String, trim: true },
  languages: [{ type: String }],
  status: { type: String },
  createdBy: { type: ObjectId, ref: "User" },
  updatedBy: { type: ObjectId, ref: "User" },
  erp: { type: Number, default: DATABASE.ERP_VERSION, select: false },
};

const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set("collection", "country");

const Country = mongoose.model("Country", newSchema);

export default Country;
