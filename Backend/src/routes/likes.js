import express from "express";
import * as controllers from "../controllers";
import verifyToken from "../middlewares/verifyToken";
const router = express.Router();

router.post("/:articleId", verifyToken, controllers.actionLikes);
router.get("/:articleId", verifyToken, controllers.getLikes);

module.exports = router;
