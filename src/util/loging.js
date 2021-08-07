import log4js from "log4js";
import { getRequestIp, safeGet } from "./helpers";

const myLog = log4js.configure({
    appenders: { file: { type: "file", filename: "logs/error.log" } },
    categories: { default: { appenders: ["file"], level: "DEBUG" } },
});

const loging = (module, req, err) => {
    const logger = myLog.getLogger(`[${module}]`);
    logger.error(
        `[400] [${getRequestIp(req)}] [${req.method}][${module}][${
            req.path
        }],  [${safeGet(req.user, "userType")}: ${safeGet(req.user, "email")}] , ${
            err.message
        }`,
    );
};

// eslint-disable-next-line import/prefer-default-export
export { loging };
