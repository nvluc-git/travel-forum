import * as controllers from "../controllers";
import verifyToken from "../middlewares/verifyToken";
import uploadCloud from "../middlewares/fileUpload";
import express from "express";
const router = express.Router();

router.get("/services", verifyToken, controllers.userGetService);

router.post("/rpArticle/:id", verifyToken, controllers.rpArticle);
router.post(
  "/rpUser/:id",
  verifyToken,
  uploadCloud.single("image"),
  controllers.rp_user
);
router.get("/currentUser", verifyToken, controllers.getCurrentUser);
router.put(
  "/update",
  verifyToken,
  uploadCloud.single("avatar"),
  controllers.updateUser
);
router.put("/changePass", verifyToken, controllers.changePass);

router.get("/:id", verifyToken, controllers.getOneAccount);

module.exports = router;
