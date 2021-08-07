import dotenv from "dotenv";
import Joi from "joi";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../api/user/model";
import { generateOtp, hash, parseId } from "../util";
import { postData } from "./request";

dotenv.config();
const syncKey = process.env.SYNC_KEY;

const JWT = {
  jwtSecret: process.env.JWT_SECRET,
  tokenExpireTime: process.env.JWT_EXPIRES,
};

export async function getUser(userType, userId) {
  try {
    const record = await User.findById(userId)
      .populate({ path: "role", select: "name" })
      .populate({ path: "terminal", select: "name, address" })
      .select("+password +otp")
      .lean()
      .exec();
    if (!record) throw new Error(`${userType} User ${userId} not found`);
    return parseId(record);
  } catch (err) {
    throw new Error(`${err.message}`);
  }
}

const validateLogin = Joi.object({
  email: Joi.string().trim().email().optional(),
  phone: Joi.string().min(11).max(14).optional(),
  otp: Joi.string().optional(),
  password: Joi.string().optional(),
  currentIp: Joi.string().required(),
})
  .xor("email", "phone")
  .xor("otp", "password");

const validateOtp = Joi.object({
  email: Joi.string().trim().email().optional(),
  phone: Joi.string().min(11).max(14).optional(),
}).xor("email", "phone");

function isValidPmtEmail(email) {
  const ends = new RegExp(`@pmt.ng$`).test(email);
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase()) && ends;
}

// eslint-disable-next-line complexity
export async function loginService(data) {
  try {
    const { error } = validateLogin.validate(data);
    if (error) throw new Error(`Invalid login data. ${error.message}`);
    const { email, phone, otp, password, currentIp } = data;
    const filter = {};
    if (phone) {
      filter.phone = phone;
    } else {
      filter.email = email;
    }
    const user = await User.findOne(filter)
      .select(
        "+otp +otpCount +otpAccess +otpTimeout +access +password +wrongPassword"
      )
      .lean()
      .exec();
    if (!user) throw new Error("User not found");
    if (!user.id) user.id = `${user._id}`;
    console.log(user);
    if (user.access === 0) throw new Error("Insufficient access level");
    if (otp) {
      if (!user.otpAccess) {
        throw new Error(`OTP access is ${user.otpAccess}`);
      }
      if (!bcryptjs.compareSync(otp, `${user.otp}`)) {
        throw new Error("Invalid OTP");
      }
    } else if (!bcryptjs.compareSync(password, `${user.password}`)) {
      throw new Error("Wrong password");
    }

    delete user.password;

    const update = {
      currentIp,
      otpAccess: false,
      currentLogin: Date.now(),
      lastLogin: user.currentLogin,
      lastIp: user.currentIp,
    };
    await User.findOneAndUpdate({ _id: user.id }, update, {
      new: true,
    }).exec();

    const payload = {
      id: user.id,
      userType: user.userType,
      email: user.email,
      time: new Date(),
    };
    const token = jwt.sign(payload, JWT.jwtSecret, {
      expiresIn: JWT.tokenExpireTime,
    });
    return { token };
  } catch (err) {
    console.log("Login Service =>", err.message);
    throw new Error(`${err.message}`);
  }
}

export async function sendOTPService(data) {
  try {
    const { error } = validateOtp.validate(data);
    if (error) throw new Error(`Invalid login data. ${error.message}`);
    const { email, phone } = data;
    const otp = generateOtp();
    const update = {
      otp: hash(`${otp}`),
      $inc: { otpCount: 1 },
      otpAccess: true,
    };
    const filter = {};
    if (phone) filter.phone = phone;
    if (email) filter.email = email;
    const otpUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    }).exec();
    if (!otpUser) {
      throw new Error(
        `User not found with credential ${JSON.stringify(filter)}`
      );
    }
    return result;
  } catch (err) {
    console.log("OTP Service =>", err.message);
    throw new Error(`${err.message}`);
  }
}
