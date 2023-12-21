import express from "express";
import * as controllers from "../controllers";
import verifyToken from "../middlewares/verifyToken";
const router = express.Router();

router.get("/:articleId", verifyToken, controllers.getComments);
router.post("/create/:articleId", verifyToken, controllers.newComment);
router.delete("/delete/:id", verifyToken, controllers.removeComment);

module.exports = router;
