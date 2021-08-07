import express from "express";

// Routes
import countryRoute from "./country";
import countyRoute from "./county";
import permissionRoute from "./permission";
import roleRoute from "./role";
import settingRoute from "./setting";
import stateRoute from "./state";
import userRoute from "./user";

const router = express.Router();

// Use Routes
router.use(countryRoute);
router.use(countyRoute);
router.use(permissionRoute);
router.use(roleRoute);
router.use(settingRoute);
router.use(stateRoute);
router.use(userRoute);

export default router;
