import "babel-polyfill";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import compression from "compression";
import helmet from "helmet";
import { CronJob } from "cron";

// import routes
import database from "./config";
import {
  countryApi,
  countyApi,
  permissionApi,
  roleApi,
  settingApi,
  stateApi,
  userApi,
} from "./api";

dotenv.config();
const app = express();
const hostname = "localhost"; // "127.0.0.1";
const port = process.env.APP_PORT;
const corsOptions = { origin: "*", optionsSuccessStatus: 200 };

app.use(cors(corsOptions));

app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: "PHP 4.2.0" }));
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.xssFilter());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.noSniff());

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(compression());
app.set("trust proxy", true);

database.once("open", () => {
  console.log("Successfully connected to the database!");
});

database.on("close", () => {
  database.removeAllListeners();
});

app.get("/api", (req, res) => {
  res.json({
    success: true,
    payload: [],
    message: "ES6 API",
  });
});

app.use((req, res, next) => {
  const agent = req.headers["user-agent"];
  const { method } = req;
  const baseUrl = req.originalUrl;
  const version = `HTTP/${req.httpVersion}`;
  const status = res.statusCode;
  // const software = req.headers[ "user-agent" ].match(/\((.+?)\)/)[ 1 ];
  const ipaddress = req.headers.origin;
  // getRequestIp(req);
  const allData = { ipaddress, agent, method, baseUrl, version, status };
  // console.log(allData);
  // const newRecord = new Access(allData);
  // newRecord.save().then().catch(err => console.log(err.message));
  next();
});

// Use Routes
app.use("/api", countryApi);
app.use("/api", countyApi);
app.use("/api", permissionApi);
app.use("/api", roleApi);
app.use("/api", settingApi);
app.use("/api", stateApi);
app.use("/api", userApi);


app.use((req, res, next) => {
  res.status(404);
  return res.json({
    success: false,
    payload: null,
    message: `ES6 API SAYS: Endpoint not found for path: ${req.path}`,
  });
});

// listen for requests
const server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.sayHello = (_) => "Hello Peace!";

setInterval(
  () =>
    server.getConnections((err, connections) =>
      console.log(`${connections} connections currently open`)
    ),
  10000
);

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);
process.on("SIGQUIT", shutDown);

let connections = [];

server.on("connection", (connection) => {
  connections.push(connection);
  // eslint-disable-next-line no-return-assign
  connection.on(
    "close",
    () => (connections = connections.filter((curr) => curr !== connection))
  );
});

function shutDown() {
  console.log("Received kill signal, shutting down gracefully");
  process.kill(process.pid, "SIGINT");
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    database.close(() => {
      console.log("Mongoose connection disconnected");
      process.exit(0);
    });
    console.log("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000);

  connections.forEach((curr) => curr.end());
  setTimeout(() => connections.forEach((curr) => curr.destroy()), port);
}

export default app;

//* ///////         CRONTABS        //////////////
// https://www.npmjs.com/package/cron

const jobDispatch = new CronJob(
  "*/5 * * * * *",
  function () {
    const now = new Date().toISOString().slice(0, 19);
    // const Pickup = require('./api/pickup/model');
    // Pickup.countDocuments({}, function(err, docCount) {
    //     if (err) { return handleError(err) }
    //     console.log(`\n[${now}] 5sec Pickup`, docCount);
    // }).exec()
    console.log(`\n[${now}] 5sec Dispatching`);
    // fs.appendFile('testing-cron-log.txt', `\n[${now}] 5sec Pickup`, function (err) {
    //     if (err) throw err;
    //     // console.log('Saved!');
    // });
  },
  null,
  true,
  "Africa/Lagos"
);
jobDispatch.start();

const jobDailyPickup = new CronJob(
  "0 0 * * * *",
  function () {
    const now = new Date().toISOString().slice(0, 19);
    // const Pickup = require('./api/pickup/model');
    // Pickup.countDocuments({}, function(err, docCount) {
    //     if (err) { return handleError(err) }
    //     console.log(`\n[${now}] Daily Pickup`, docCount);
    // })
  },
  null,
  true,
  "Africa/Lagos"
);
jobDailyPickup.start();
