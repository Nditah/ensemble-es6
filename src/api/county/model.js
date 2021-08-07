/* eslint-disable import/no-cycle */
/**
 * @author Nditah
 * @property {ObjectId} id County primaryKey
 * @property {String} name County short name
 * @property {ObjectId} state County State Id
 * @property {ObjectId} createdBy County record created by
 * @property {ObjectId} updatedBy County record modified by
 * @description County holds record of all cities with terminalList
 */
import Joi from "joi";
import mongoose from "mongoose";
import { DATABASE } from "../../constants";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const validateCreate = Joi.object({
  name: Joi.string().trim().required(),
  state: Joi.string().required(),
  createdBy: Joi.string()
    .regex(DATABASE.OBJECT_ID_REGEX, "valid objectID")
    .required(),
});

export const validateUpdate = Joi.object({
  name: Joi.string().trim().optional(),
  state: Joi.string().optional(),
  updatedBy: Joi.string()
    .regex(DATABASE.OBJECT_ID_REGEX, "valid objectID")
    .required(),
});

export const schema = {
  name: { type: String },
  state: { type: ObjectId, ref: "State" },
  createdBy: { type: ObjectId, required: true },
  updatedBy: { type: ObjectId, allowNull: true },
  erp: { type: Number, default: DATABASE.ERP_VERSION, select: false },
};

const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set("collection", "county");

const County = mongoose.model("County", newSchema);

export default County;
