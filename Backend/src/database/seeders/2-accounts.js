"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Accounts",
      [
        {
          email: "admin@gmail.com",
          password: bcrypt.hashSync("123456", bcrypt.genSaltSync(8)),
          username: "Admin",
          avatar:
            "https://res.cloudinary.com/din7kzrj4/image/upload/v1701416009/test-be/admin_pjeju7.jpg",
          roleId: 1,
        },

        {
          email: "user1@gmail.com",
          password: bcrypt.hashSync("123456", bcrypt.genSaltSync(8)),
          username: "Vegeta",
          avatar:
            "https://res.cloudinary.com/din7kzrj4/image/upload/v1701415932/test-be/vegeta_wneb0p.png",
          roleId: 2,
        },
        {
          email: "user2@gmail.com",
          password: bcrypt.hashSync("123456", bcrypt.genSaltSync(8)),
          username: "sakura",
          avatar:
            "https://res.cloudinary.com/din7kzrj4/image/upload/v1701415932/test-be/vegeta_wneb0p.png",
          roleId: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
