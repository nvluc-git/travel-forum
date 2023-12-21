const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("myforum", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const connectionDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connectionDatabase;
