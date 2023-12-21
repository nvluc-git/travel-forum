"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Services",
      [
        {
          title: "Agoda",
          image:
            "https://cdn10.agoda.net/images/mvc/default/agoda-logo-flat-2019.png",
          linkTo: "https://www.agoda.com/",
        },
        {
          title: "Klook",
          image:
            "https://res.klook.com/image/upload/q_auto,c_fill,w_1120,h_584/v1645439471/fyhpxzhcyqrzhpxnthoo.jpg",
          linkTo: "https://www.klook.com/en-US/",
        },
        {
          title: "Booking",
          image:
            "https://yt3.googleusercontent.com/QjgBje2kUkOpOUpX6hTBVxXL07KjpMVcPyNhPmijo70qR93Yfi1TeslytgpckIn9-9Znfc6QXw=s900-c-k-c0x00ffffff-no-rj",
          linkTo: "https://booking.com/",
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
