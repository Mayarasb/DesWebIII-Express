'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('brand',
      {
        id_brand: {
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
          type: DataTypes.INTEGER
        },
        descricao: {
          allowNull: false,
          type: DataTypes.STRING(100)
        }

      })
  }
  ,

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('brand');

  }
};
