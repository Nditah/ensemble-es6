import aqp from "api-query-params";
import hashing from "object-hash";
import County, { validateCreate, validateUpdate } from "./model";
import { setLimit } from "../../util";

export async function fetchService(query) {
  try {
    const { filter, skip, sort, projection, population } = aqp(query);
    let { limit } = aqp(query);
    limit = 1000;
    // limit = setLimit(defaultLimit);
    const queryObj = { limit, filter, skip, sort, projection, population };
    const redisKey = `county-${hashing(queryObj)}`;
    const total = await County.countDocuments(filter).exec();
    const result = await County.find(filter)
      .cache(60, redisKey)
      .populate(population)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .lean()
      .exec();
    if (!result) {
      throw new Error(`County record not found.`);
    }
    const count = result.length;
    const msg = `${count} County record(s) retrieved successfully!`;
    const entity = { payload: result, total, count, msg, skip, limit, sort };
    return entity;
  } catch (err) {
    throw new Error(`Error retrieving County record. ${err.message}`);
  }
}

export async function createService(data, jwtToken = "") {
  try {
    const { error } = validateCreate.validate(data);
    if (error) throw new Error(`Invalid County data. ${error.message}`);
    const newRecord = new County(data);
    const result = await newRecord.save();
    if (!result) {
      throw new Error("County record not found.");
    }
    return result;
  } catch (err) {
    throw new Error(`Error creating County record. ${err.message}`);
  }
}

export async function updateService(recordId, data, jwtToken = "") {
  try {
    const { error } = validateUpdate.validate(data);
    if (error) throw new Error(`Invalid County data. ${error.message}`);
    const result = await County.findOneAndUpdate({ _id: recordId }, data, {
      new: true,
    }).exec();
    if (!result) {
      throw new Error("County record not found.");
    }
    return result;
  } catch (err) {
    throw new Error(`Error updating County record. ${err.message}`);
  }
}

export async function patchService(recordId, data, jwtToken = "") {
  try {
    const result = await County.findOneAndUpdate({ _id: recordId }, data, {
      new: true,
    }).exec();
    if (!result) {
      throw new Error("County record not found.");
    }
    return result;
  } catch (err) {
    throw new Error(`Error patching County record. ${err.message}`);
  }
}

export async function deleteService(recordId, jwtToken = "") {
  try {
    const result = await County.findOneAndRemove({ _id: recordId }).exec();
    if (!result) {
      throw new Error("County record not found.");
    }
    return result;
  } catch (err) {
    throw new Error(`Error deleting County record. ${err.message}`);
  }
}
