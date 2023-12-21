import article from "./articles";
import auth from "./auth";
import user from "./user";
import category from "./categories";
import types from "./types";
import comments from "./comments";
import likes from "./likes";
import notis from "./notis";
import bookmark from "./bookmark";
import admin from "./admin";

function initRoute(app) {
  app.use("/api/categories", category);
  app.use("/api/types", types);

  app.use("/api/articles", article);

  app.use("/api/comments", comments);
  app.use("/api/likes", likes);
  app.use("/api/notis", notis);
  app.use("/api/bookmark", bookmark);

  app.use("/api/users", user);
  app.use("/api/admin", admin);

  app.use("/api/auth", auth);

  app.use("/", (req, res) => {
    res.send("hello");
  });
}

module.exports = initRoute;
