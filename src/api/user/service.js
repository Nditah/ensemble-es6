import aqp from "api-query-params";
import hashing from "object-hash";
import User, {
  validateCreate,
  validateUpdate,
  validateSelfUpdate,
} from "./model";
import { hasProp, hash, setLimit, safeGet } from "../../util";
import { postData } from "../../services";
import { EMAIL, SYSTEM, USER_TYPE } from "../../constants";

const module = "User";

export async function fetchService(query) {
  try {
    const { filter, skip, sort, projection, population } = aqp(query);
    let { limit } = aqp(query);
    limit = setLimit(limit);
    if (!filter.deleted) filter.deleted = false;
    const queryObj = { limit, filter, skip, sort, projection, population };
    const redisKey = `${module}-${hashing(queryObj)}`;
    const total = await User.countDocuments(filter).exec();
    const result = await User.find(filter)
      .cache(60, redisKey)
      .populate(population)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .lean()
      .exec();
    if (!result) {
      throw new Error(`${module} record not found.`);
    }
    return { payload: result, total, skip, limit, sort };
  } catch (err) {
    throw new Error(`${err.message}`);
  }
}

// eslint-disable-next-line complexity
export async function createService(data, session, user = {}) {
  try {
    data.password = data.password || "peace"; //! Random password
    const { password, email, phone } = data;
    if (hasProp(data, "password")) data.password = hash(data.password);
    const { error } = validateCreate.validate(data);
    if (error) throw new Error(`Invalid User data. ${error.message}`);
    const duplicate = await User.findOne({
      $or: [{ email }, { phone }],
    }).exec();
    if (duplicate) {
      throw new Error(`Error! Record already exist for ${email} or ${phone}`);
    }
    const newRecord = new User(data);
    const result = await newRecord.save({ session });
    if (!result) {
      throw new Error("User record not found.");
    }
    //TODO Send MailService
    return result;
  } catch (err) {
    throw new Error(`Error creating User record. ${err.message}`);
  }
}

export async function updateAdminService(recordId, data, user) {
  try {
    if (recordId === SYSTEM.EMENE_USER) {
      throw new Error(`Cannot update record. ${recordId}`);
    }
    if (hasProp(data, "password")) {
      data.password = hash(data.password);
    }
    const { error } = validateUpdate.validate(data);
    data.status = "PENDING";
    if (error) throw new Error(`Invalid User data. ${error.message}`);

    const result = await User.findOneAndUpdate({ _id: recordId }, data, {
      new: true,
    }).exec();
    if (!result) {
      throw new Error("User record not found.");
    }
    return result;
  } catch (err) {
    throw new Error(`Error updating User record. ${err.message}`);
  }
}

export async function updateSelfService(data, user) {
  try {
    if (safeGet(data, "password", false)) data.password = hash(data.password);
    const { error } = validateSelfUpdate.validate(data);
    if (error) throw new Error(`Invalid User data. ${error.message}`);
    const result = await User.findOneAndUpdate({ _id: user.id }, data, {
      new: true,
    }).exec();
    if (!result) {
      throw new Error("User record not found.");
    }
    return result;
  } catch (err) {
    throw new Error(`Error updating User record. ${err.message}`);
  }
}

export async function patchService(recordId, data = {}) {
  try {
    const result = await User.findOneAndUpdate({ _id: recordId }, data, {
      new: true,
    }).exec();
    if (!result) {
      throw new Error("User record not found.");
    }
    return result;
  } catch (err) {
    throw new Error(`Error patching User record. ${err.message}`);
  }
}

// eslint-disable-next-line consistent-return
export async function deleteService(recordId) {
  try {
    if (recordId === SYSTEM.EMENE_USER)
      throw new Error(`Cannot delete record. ${recordId}`);
    const result = await User.findOneAndRemove({ _id: recordId }).exec();
    if (!result) {
      throw new Error("User record not found.");
    }
    return result;
  } catch (err) {
    throw new Error(`Error deleting User record. ${err.message}`);
  }
}
