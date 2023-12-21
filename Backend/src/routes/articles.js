import express from "express";
import * as controllers from "../controllers";
import uploadCloud from "../middlewares/fileUpload";
import verifyToken from "../middlewares/verifyToken";
const router = express.Router();

router.delete("/delete/:id", verifyToken, controllers.deleteArticle);
router.post(
  "/create",
  verifyToken,
  uploadCloud.single("image"),
  controllers.createArticle
);
router.put(
  "/update",
  verifyToken,
  uploadCloud.single("image"),
  controllers.updateArticle
);

router.get("/articlePostUser", verifyToken, controllers.getPostUser);
router.get("/articleQuestionUser", verifyToken, controllers.getQuestionUser);

router.get("/articlePost", verifyToken, controllers.getArticleByPost);
router.get("/articleQuestion", verifyToken, controllers.getArticleByQuestion);

router.get("/articleUser/:id", verifyToken, controllers.getArticleByUser);

router.get("/:id", verifyToken, controllers.getOneArticle);
router.get("/", verifyToken, controllers.getAllArticle);

module.exports = router;
