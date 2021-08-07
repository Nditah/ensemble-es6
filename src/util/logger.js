import log4js from "log4js";

export default log4js.configure({
    appenders: { file: { type: "file", filename: "logs/error.log" } },
    categories: { default: { appenders: ["file"], level: "DEBUG" } },
});
