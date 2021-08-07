/* eslint-disable object-shorthand */
import aqp from "api-query-params";
import hashing from "object-hash";
import { setLimit } from "../../util";
import Setting, { validateCreate, validateUpdate } from "./model";

const module = "Setting";

export async function findSetting(query) {
  const { filter, skip, sort, projection, population } = aqp(query);
  let { limit } = aqp(query);
  limit = setLimit(limit);
  if (!filter.deleted) filter.deleted = false;
  const total = await Setting.countDocuments(filter).exec();
  const result =
    (await Setting.find(filter)
      .populate(population)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .exec()) || [];
  if (!result) {
    throw new Error("Setting record not found.");
  }
  const count = result.length;
  const msg = `${count} Setting record(s) retrieved successfully!`;
  const entity = { payload: result, total, count, msg, skip, limit, sort };
  return entity;
}

export async function fetchRecordPublicService(query) {
  try {
    const entity = await findSetting(query);
    if (!entity) {
      throw new Error(`${module} record not found.`);
    }
    return entity;
  } catch (err) {
    throw new Error(`${err.message}`);
  }
}

export async function fetchService(query) {
  try {
    const { filter, skip, sort, projection, population } = aqp(query);
    let { limit } = aqp(query);
    limit = setLimit(limit);
    if (!filter.deleted) filter.deleted = false;
    const total = await Setting.countDocuments(filter).exec();
    const result = await Setting.find(filter)
      .populate(population)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .select(projection)
      .exec();
    if (!result) {
      throw new Error("Setting record not found.");
    }
    const count = result.length;
    const msg = `${count} Setting record(s) retrieved successfully!`;
    const entity = { payload: result, total, count, msg, skip, limit, sort };
    return entity;
  } catch (err) {
    throw new Error(`${err.message}`);
  }
}

export async function createService(data) {
  try {
    const { error } = validateCreate.validate(data);
    if (error) throw new Error(`Invalid ${module} data. ${error.message}`);
    const newRecord = new Setting(data);
    const result = await newRecord.save();
    if (!result) {
      throw new Error(`${module} record not found.`);
    }
    return result;
  } catch (err) {
    throw new Error(`${err.message}`);
  }
}

export async function updateService(recordId, data) {
  try {
    const { error } = validateUpdate.validate(data);
    if (error) throw new Error(`Invalid ${module} data. ${error.message}`);
    const result = await Setting.findOneAndUpdate({ _id: recordId }, data, {
      new: true,
    }).exec();
    if (!result) {
      throw new Error(`${module} record with Id ${recordId} not found.`);
    }
    return result;
  } catch (err) {
    throw new Error(`${err.message}`);
  }
}

export async function patchService(recordId, data) {
  try {
    const result = await Setting.findOneAndUpdate({ _id: recordId }, data, {
      new: true,
    }).exec();
    if (!result) {
      throw new Error(`${module} record not found.`);
    }
    return result;
  } catch (err) {
    throw new Error(`${err.message}`);
  }
}
