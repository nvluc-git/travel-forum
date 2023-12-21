import * as controllers from "../controllers";
import express from "express";
const router = express.Router();

router.post("/register", controllers.register);
router.post("/login", controllers.login);
router.get("/verify/:token", controllers.verifyEmail);
router.post("/sendEmail", controllers.sendEmail);
router.get("/checkForgot/:token", controllers.checkForgot);
router.put("/resetPass", controllers.resetPass);

module.exports = router;
