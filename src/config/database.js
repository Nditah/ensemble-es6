import mongoose from "mongoose";
import dotenv from "dotenv";
import cachegoose from "recachegoose";

import credentials from "./credentials";

dotenv.config();

const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";

mongoose.Promise = global.Promise;

const { uri, options } = credentials;

mongoose.connect(uri, options)
    .then(() => { console.log("Connected to database!"); })
    .catch((error) => {
        console.error("Connection failed!");
        console.error(error.message);
        process.exit(1);
    });

mongoose.plugin((schema) => {
    schema.options.toJSON = {
        virtuals: true,
        versionKey: false,
        transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        }
    };
    });

cachegoose(mongoose, {
    // engine: "memory", // "file"
    engine: "redis",
    // eslint-disable-next-line global-require
    client: require("redis").createClient(redisUrl),
});
const database = mongoose.connection;

// database.on("error", console.error.bind(console, "Database Connection Error:"));

export { mongoose }
export default database;
