import aqp from "api-query-params";
import hashing from "object-hash";
import { setLimit } from "../../util";
import Role, { validateCreate, validateUpdate } from "./model";

const module = "Role";

export async function fetchService(query) {
  try {
    const { filter, skip, sort, projection, population } = aqp(query);
    let { limit } = aqp(query);
    limit = 500;
    if (!filter.deleted) filter.deleted = false;
    const queryObj = { limit, filter, skip, sort, projection, population };
    const redisKey = `role-${hashing(queryObj)}`;
    const total = await Role.countDocuments(filter).exec();
    const result = await Role.find(filter)
      .cache(60, redisKey)
      .populate(population)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .exec();
    if (!result) {
      throw new Error("Role record not found.");
    }
    const count = result.length;
    const msg = `${count} Role record(s) retrieved successfully!`;
    const entity = { payload: result, total, count, msg, skip, limit, sort };
    return entity;
  } catch (err) {
    throw new Error(`Error: ${module} fetchService. ${err.message}`);
  }
}

export async function createService(data) {
  try {
    const { error } = validateCreate.validate(data);
    if (error) throw new Error(`Invalid ${module} data. ${error.message}`);
    const newRecord = new Role(data);
    const result = await newRecord.save();
    if (!result) {
      throw new Error(`${module} record created not found.`);
    }
    return result;
  } catch (err) {
    throw new Error(`Error: ${module} createService. ${err.message}`);
  }
}

export async function updateService(recordId, data) {
  try {
    const { error } = validateUpdate.validate(data);
    if (error) throw new Error(`Invalid ${module} data. ${error.message}`);
    const result = await Role.findOneAndUpdate({ _id: recordId }, data, {
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
    const result = await Role.findOneAndUpdate({ _id: recordId }, data, {
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
    const result = await Role.findOneAndRemove({ _id: recordId }).exec();
    if (!result) {
      throw new Error(`${module} record deleted not found.`);
    }
    return result;
  } catch (err) {
    throw new Error(`Error: ${module} deleteService. ${err.message}`);
  }
}
