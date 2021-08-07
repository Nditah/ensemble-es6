import mongoose from "mongoose";
import { SYSTEM, GENDER, USER_TYPE, EMAIL } from "../../constants";
import { hash } from "../../util";

const table = [
  {
    _id: new mongoose.Types.ObjectId(SYSTEM.EMENE_USER),
    type: USER_TYPE.USER,
    email: EMAIL.ADMIN,
    phone: "08167235519",
    password: hash("kindness"),
    surname: "Adam",
    otherName: "Eve",
    gender: GENDER.MALE,
    username: "adamu",
    access: 4,
    createdBy: new mongoose.Types.ObjectId(SYSTEM.EMENE_USER),
  },
];

export default table;
