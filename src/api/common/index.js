import mongoose from "mongoose";

/**
 * @description https://mongoosejs.com/docs/geojson.html
 */

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Point"],
        required: true,
    },
    coordinates: {
        type: [Number],
        required: true,
    },
});

const polygonSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Polygon"],
        required: true,
    },
    coordinates: {
        type: [[[Number]]], // Array of arrays of arrays of numbers
        required: true,
    },
});

export { pointSchema as Location, polygonSchema };
