import Joi from "joi";
import mongoose from "mongoose";
import {
  DATABASE,
  GENDER,
  USER_TYPE,
  MARITAL_STATUS,
  EMAIL,
} from "../../constants";
import table from "./table";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const STATUS = ["PENDING", "APPROVED", "REJECTED"];
const TYPES = Object.values(USER_TYPE);

export const validateCreate = Joi.object({
  type: Joi.string()
    .valid(...TYPES)
    .optional(),
  serial: Joi.string().optional(),
  title: Joi.string().required(),
  surname: Joi.string().required(),
  otherName: Joi.string().required(),
  gender: Joi.string().required(),
  birthDate: Joi.date().optional(),
  maritalStatus: Joi.string().optional(),
  children: Joi.number().integer().optional(),
  phone: Joi.string().replace(/(\D+)/g, "").min(11).required(),
  phoneHome: Joi.string().optional(),
  emailPersonal: Joi.string().email().optional(),
  address: Joi.string().optional(),
  village: Joi.string().optional(),
  state: Joi.string()
    .regex(DATABASE.OBJECT_ID_REGEX, "valid objectID")
    .optional(),
  county: Joi.string()
    .regex(DATABASE.OBJECT_ID_REGEX, "valid objectID")
    .optional(),
  country: Joi.string().length(2).optional(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().optional(),
  otp: Joi.string().optional(),
  otpCount: Joi.number().optional(),
  profession: Joi.string().optional(),
  qualification: Joi.string().optional(),
  institution: Joi.string().optional(),
  bank: Joi.string().optional(),
  wallet: Joi.string().trim().optional(),
  rank: Joi.string().optional(),
  office: Joi.string().optional(),
  role: Joi.string().optional(),
  remark: Joi.string().optional(),
  photo: Joi.string().optional(),
  isDocumented: Joi.boolean().optional(),
  access: Joi.number().min(0).max(5).optional(),
  createdBy: Joi.string()
    .regex(DATABASE.OBJECT_ID_REGEX, "valid objectID")
    .required(),
});

export const validateUpdate = Joi.object({
  type: Joi.string()
    .valid(...TYPES)
    .optional(),
  serial: Joi.string().optional(),
  title: Joi.string().optional(),
  surname: Joi.string().optional(),
  otherName: Joi.string().optional(),
  gender: Joi.string().optional(),
  birthDate: Joi.date().optional(),
  maritalStatus: Joi.string().optional(),
  children: Joi.number().integer().optional(),
  phone: Joi.string().replace(/(\D+)/g, "").min(8).optional(),
  phoneHome: Joi.string().optional(),
  emailPersonal: Joi.string().optional(),
  address: Joi.string().optional(),
  village: Joi.string().optional(),
  state: Joi.string().optional(),
  county: Joi.string().optional(),
  country: Joi.string().optional(),
  email: Joi.string().trim().email().optional(),
  password: Joi.string().optional(),
  otp: Joi.string().optional(),
  otpCount: Joi.number().optional(),
  kin: Joi.string().optional(),
  kinPhone: Joi.string().optional(),
  kinAddress: Joi.string().optional(),
  profession: Joi.string().optional(),
  qualification: Joi.string().optional(),
  institution: Joi.string().optional(),
  tin: Joi.string().optional(),
  wallet: Joi.string().trim().optional(),
  remark: Joi.string().optional(),
  photo: Joi.string().optional(),
  isDocumented: Joi.boolean().optional(),
  access: Joi.number().min(0).max(5).optional(),
  role: Joi.string()
    .regex(DATABASE.OBJECT_ID_REGEX, "valid objectID")
    .optional(),
  updatedBy: Joi.string()
    .regex(DATABASE.OBJECT_ID_REGEX, "valid objectID")
    .required(),
});

export const validateSelfUpdate = Joi.object({
  title: Joi.string().optional(),
  maritalStatus: Joi.string().optional(),
  phoneHome: Joi.string().replace(/(\D+)/g, "").min(11).optional(),
  emailPersonal: Joi.string().optional(),
  password: Joi.string().optional(),
  kin: Joi.string().optional(),
  qualification: Joi.string().optional(),
  institution: Joi.string().optional(),
  updatedBy: Joi.string()
    .regex(DATABASE.OBJECT_ID_REGEX, "valid objectID")
    .required(),
});

export const schema = {
  serial: { type: String, trim: true },
  title: { type: String, trim: true },
  type: { type: String, enum: TYPES },
  surname: { type: String, required: true, text: true },
  otherName: { type: String, required: true, text: true },
  gender: {
    type: String,
    enum: Object.values(GENDER),
    default: GENDER.MALE,
    required: true,
  },
  birthDate: { type: Date },
  maritalStatus: {
    type: String,
    enum: Object.values(MARITAL_STATUS),
  },
  phone: { type: String, trim: true, required: true },
  address: { type: String },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    text: true,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  emailPersonal: {
    type: String,
    trim: true,
    lowercase: true,
    text: true,
    unique: true,
    // eslint-disable-next-line no-useless-escape
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },

  access: { type: Number, default: 1, min: 0, max: 7, select: false },
  password: { type: String, trim: true, required: true, select: false },
  wallet: { type: String, trim: true },
  isDocumented: { type: Boolean, default: false },

  qualification: { type: String },
  institution: { type: String },
  profession: { type: String, trim: true, index: true },
  role: { type: ObjectId, ref: "Role" },
  superior: { type: ObjectId, ref: "User" },

  state: { type: ObjectId, ref: "State" },
  village: { type: String },
  county: { type: ObjectId, ref: "County" },
  country: { type: String, default: "NG" },

  driverLicence: { type: String, trim: true },
  vehicleSerial: { type: String, trim: true },
  vehicleType: { type: String, trim: true },
  remark: { type: String },
  photo: { type: String },
  status: { type: String, enum: STATUS, default: "PENDING" },

  // Socail Media
  linkedin: { type: String, trim: true },
  facebook: { type: String, trim: true },
  twitter: { type: String, trim: true },
  instagram: { type: String, trim: true },
  skype: { type: String, trim: true },
  website: { type: String, trim: true },

  otp: { type: String, trim: true, select: false },
  otpCount: { type: Number, default: 0, select: false },
  otpAccess: { type: Number, enum: [0, 1], default: 0, select: false },
  otpTimeout: { type: Date, select: false },
  wrongPassword: { type: Number, default: 0, select: false },
  lastLogin: { type: Date },
  currentLogin: { type: Date },
  lastIp: { type: String },
  currentIp: { type: String },
  createdBy: { type: ObjectId, select: false },
  updatedBy: { type: ObjectId, select: false },
  deleted: { type: Boolean, default: false, select: false },
  deletedAt: { type: Date, select: false },
  deletedBy: { type: ObjectId, select: false },
  erp: { type: Number, default: DATABASE.ERP_VERSION, select: false },
};

const options = DATABASE.OPTIONS;

const newSchema = new Schema(schema, options);

newSchema.index({ phone: 1, email: 1 }, { unique: true });
newSchema.index({ serial: 1 }, { unique: true });
newSchema.index({ email: 1 });


newSchema.index({ createdAt: 1 });
newSchema.index({ updatedAt: 1 });

newSchema.set("collection", "user");

const User = mongoose.model("User", newSchema);

User.countDocuments({ email: { $eq: EMAIL.ADMIN } }, function (err, count) {
  if (count === 0) {
    User.insertMany(table)
      .then((a) => console.log("Data inserted"))
      .catch((error) => console.log(error.message));
  }
});

export default User;

/*
access levels 6,7 are prepopulated
*   LEVEL   -   ACCESS            -     PERSONS
! ======================================================
*   0       -   NO ACCESS         -     ALL EMPLOYEES
*   1       -   VIEW RECORDS      -     USER
*   2       -   CREATE RECORD     -     OFFICERS
*   3       -   UPDATE RECORD     -     UNIT HEADS
*   4       -   PATCH RECORD      -     HOD
*   5       -   DELETE RECORD     -     DIRECTOR, BOARD,
*   6       -   APPOINT           -     CHAIRMAN
*   7       -   UNLIMITED         -     -
*/
