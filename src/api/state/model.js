/* eslint-disable import/no-cycle */
/**
 * @author Nditah
 * @property {ObjectId} id State primaryKey
 * @property {String} name State name
 * @property {String} country The Country where the state is located
 * @property {ObjectId} createdBy State record created by
 * @property {ObjectId} updatedBy State record modified by
 * @description State holds record of all cities with terminalList
 */
import Joi from "joi";
import mongoose from "mongoose";
import { DATABASE } from "../../constants";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

export const validateCreate = Joi.object({
  name: Joi.string().trim().required(),
  country: Joi.string().trim().max(2).required(),
  createdBy: Joi.string()
    .regex(DATABASE.OBJECT_ID_REGEX, "valid objectID")
    .required(),
});

export const validateUpdate = Joi.object({
  name: Joi.string().trim().optional(),
  country: Joi.string().trim().max(2).optional(),
  updatedBy: Joi.string()
    .regex(DATABASE.OBJECT_ID_REGEX, "valid objectID")
    .required(),
});

export const schema = {
  name: { type: String, required: true, index: true, unique: true },
  country: { type: String, required: true },
  createdBy: { type: ObjectId, ref: "User", required: true },
  updatedBy: { type: ObjectId, ref: "User" },
  erp: { type: Number, default: DATABASE.ERP_VERSION, select: false },
};

const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);
newSchema.set("collection", "state");

const State = mongoose.model("State", newSchema);

export default State;
