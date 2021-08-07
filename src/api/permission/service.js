import aqp from "api-query-params";
import hashing from "object-hash";
import { setLimit } from "../../util";
import Permission, { validateCreate, validateUpdate } from "./model";

const module = "Permission";

export async function fetchService(query, jwtToken) {
  try {
    const { filter, skip, sort, projection, population } = aqp(query);
    let { limit } = aqp(query);
    limit = 1000;
    // limit = setLimit(limit);
    if (!filter.deleted) filter.deleted = false;
    const queryObj = { limit, filter, skip, sort, projection, population };
    const redisKey = `permission-${hashing(queryObj)}`;
    const total = await Permission.countDocuments(filter).exec();
    const result = await Permission.find(filter)
      .cache(60, redisKey)
      .populate(population)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .lean()
      .exec();
    if (!result) {
      throw new Error("Permission record not found.");
    }
    const count = result.length;
    const msg = `${count} Permission record(s) retrieved successfully!`;
    const entity = { payload: result, total, count, msg, skip, limit, sort };
    return entity;
  } catch (err) {
    throw new Error(`${module} fetchService. ${err.message}`);
  }
}

export async function createService(data, jwtToken) {
  try {
    const { error } = validateCreate.validate(data);
    if (error) throw new Error(`Invalid ${module} data. ${error.message}`);
    const newRecord = new Permission(data);
    const result = await newRecord.save();
    if (!result) {
      throw new Error(`${module} record not found.`);
    }
    return result;
  } catch (err) {
    throw new Error(`${module} createService. ${err.message}`);
  }
}

export async function updateService(recordId, data) {
  try {
    const { error } = validateUpdate.validate(data);
    if (error) throw new Error(`Invalid ${module} data. ${error.message}`);
    const result = await Permission.findOneAndUpdate({ _id: recordId }, data, {
      new: true,
    }).exec();
    if (!result) {
      throw new Error(
        `${module} record updated with Id ${recordId} not found.`
      );
    }
    return result;
  } catch (err) {
    throw new Error(`Error: ${module} updateService. ${err.message}`);
  }
}

export async function patchService(recordId, data) {
  try {
    const result = await Permission.findOneAndUpdate({ _id: recordId }, data, {
      new: true,
    }).exec();
    if (!result) {
      throw new Error(`${module} record patched not found.`);
    }
    return result;
  } catch (err) {
    throw new Error(`Error: ${module} patchService. ${err.message}`);
  }
}

export async function deleteService(recordId) {
  try {
    const result = await Permission.findOneAndRemove({ _id: recordId }).exec();
    if (!result) {
      throw new Error(`${module} record deleted not found.`);
    }
    return result;
  } catch (err) {
    throw new Error(`Error: ${module} deleteService. ${err.message}`);
  }
}
