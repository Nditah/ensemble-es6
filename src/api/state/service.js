import aqp from "api-query-params";
import hashing from "object-hash";
import State, { validateCreate, validateUpdate } from "./model";
import { setLimit } from "../../util";

export async function fetchService(query) {
  try {
    const { filter, skip, sort, projection, population } = aqp(query);
    let { limit } = aqp(query);
    limit = setLimit(limit);
    const queryObj = { limit, filter, skip, sort, projection, population };
    const redisKey = `state-${hashing(queryObj)}`;
    const total = await State.countDocuments(filter).exec();
    const result = await State.find(filter)
      .cache(60, redisKey)
      .populate(population)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .lean()
      .exec();
    if (!result) {
      throw new Error(`State record not found.`);
    }
    const count = result.length;
    const msg = `${count} State record(s) retrieved successfully!`;
    const entity = { payload: result, total, count, msg, skip, limit, sort };
    return entity;
  } catch (err) {
    throw new Error(`Error retrieving State record. ${err.message}`);
  }
}

export async function createService(data, jwtToken = "") {
  try {
    const { error } = validateCreate.validate(data);
    if (error) throw new Error(`Invalid State data. ${error.message}`);
    const newRecord = new State(data);
    const result = await newRecord.save();
    if (!result) {
      throw new Error("State record not found.");
    }
    return result;
  } catch (err) {
    throw new Error(`Error creating State record. ${err.message}`);
  }
}

export async function updateService(recordId, data, jwtToken = "") {
  try {
    const { error } = validateUpdate.validate(data);
    if (error) throw new Error(`Invalid State data. ${error.message}`);
    const result = await State.findOneAndUpdate({ _id: recordId }, data, {
      new: true,
    }).exec();
    if (!result) {
      throw new Error("State record not found.");
    }
    return result;
  } catch (err) {
    throw new Error(`Error updating State record. ${err.message}`);
  }
}

export async function patchService(recordId, data, jwtToken = "") {
  try {
    const result = await State.findOneAndUpdate({ _id: recordId }, data, {
      new: true,
    }).exec();
    if (!result) {
      throw new Error("State record not found.");
    }
    return result;
  } catch (err) {
    throw new Error(`Error patching State record. ${err.message}`);
  }
}

export async function deleteService(recordId, jwtToken = "") {
  try {
    const result = await State.findOneAndRemove({ _id: recordId }).exec();
    if (!result) {
      throw new Error("State record not found.");
    }
    return result;
  } catch (err) {
    throw new Error(`Error deleting State record. ${err.message}`);
  }
}
