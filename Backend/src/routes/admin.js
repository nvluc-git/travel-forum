import express from "express";
import * as controllers from "../controllers";
import verifyToken from "../middlewares/verifyToken";
import isAdmin from "../middlewares/verifyRole";
import uploadCloud from "../middlewares/fileUpload";

const router = express.Router();

router.use(verifyToken);
router.use(isAdmin);

router.delete("/removeArticle/:id", verifyToken, controllers.removeArticle);

router.put(
  "/service/update",
  uploadCloud.single("image"),
  controllers.updateService
);
router.post(
  "/service/create",
  uploadCloud.single("image"),
  controllers.createService
);
router.delete("/service/delete/:id", controllers.removeService);
router.get("/service/:id", controllers.getOneService);
router.get("/services", controllers.getAllService);

router.put("/banned/:id", controllers.bannedUser);
router.delete("/deleteUser/:id", controllers.deleteUser);
router.post(
  "/sendMess/:id",
  uploadCloud.single("image"),
  controllers.sendMessToUser
);

router.get("/users", controllers.getAllUser);

module.exports = router;
