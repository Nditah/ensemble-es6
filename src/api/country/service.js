import aqp from "api-query-params";
import hashing from "object-hash";
import Country, { validateCreate, validateUpdate } from "./model";
import { setLimit } from "../../util";

export async function fetchService(query) {
  try {
    const { filter, skip, sort, projection, population } = aqp(query);
    let { limit } = aqp(query);
    limit = setLimit(limit);
    const queryObj = { limit, filter, skip, sort, projection, population };
    const redisKey = `country-${hashing(queryObj)}`;
    const total = await Country.countDocuments(filter).exec();
    const result = await Country.find(filter)
      .cache(60, redisKey)
      .populate(population)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .lean()
      .exec();
    if (!result) {
      throw new Error(`Country record not found.`);
    }
    return { payload: result, total, skip, limit, sort };
  } catch (err) {
    throw new Error(`Error retrieving Country record. ${err.message}`);
  }
}

export async function createService(data, jwtToken = "") {
  try {
    const { error } = validateCreate.validate(data);
    if (error) throw new Error(`Invalid Country data. ${error.message}`);
    const newRecord = new Country(data);
    const result = await newRecord.save();
    if (!result) {
      throw new Error("Country record not found.");
    }
    return result;
  } catch (err) {
    throw new Error(`Error creating Country record. ${err.message}`);
  }
}

export async function updateService(recordId, data, jwtToken = "") {
  try {
    const { error } = validateUpdate.validate(data);
    if (error) throw new Error(`Invalid Country data. ${error.message}`);
    const result = await Country.findOneAndUpdate({ _id: recordId }, data, {
      new: true,
    }).exec();
    if (!result) {
      throw new Error("Country record not found.");
    }
    return result;
  } catch (err) {
    throw new Error(`Error updating Country record. ${err.message}`);
  }
}

export async function patchService(recordId, data, jwtToken = "") {
  try {
    const result = await Country.findOneAndUpdate({ _id: recordId }, data, {
      new: true,
    }).exec();
    if (!result) {
      throw new Error("Country record not found.");
    }
    return result;
  } catch (err) {
    throw new Error(`Error patching Country record. ${err.message}`);
  }
}

export async function deleteService(recordId, jwtToken = "") {
  try {
    const result = await Country.findOneAndRemove({ _id: recordId }).exec();
    if (!result) {
      throw new Error("Country record not found.");
    }
    return result;
  } catch (err) {
    throw new Error(`Error deleting Country record. ${err.message}`);
  }
}
