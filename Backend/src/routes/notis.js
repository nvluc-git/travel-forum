import express from "express";
import * as controllers from "../controllers";
import verifyToken from "../middlewares/verifyToken";
const router = express.Router();

router.get("/:id", verifyToken, controllers.getNotis);

module.exports = router;
