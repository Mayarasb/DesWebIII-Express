'use strict';

const { type } = require('os');
const { DataTypes } = require('sequelize');
const { AutoIncrement } = require('sequelize-typescript');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
     await queryInterface.createTable('product',{
       id_product:{
        primaryKey: true,
        AutoIncrement: true,
        allowNull:false,
        type: DataTypes.INTEGER,

       },
       nome: {
        allowNull: false,
        type: DataTypes.STRING(100),
       },
       id_marca: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "brand",
          key:"id_brand",
        },
        onUpdate:"CASCADE",
        onDelete: "CASCADE",
       },
       cod_barras: {
        allowNull: false,
        type: DataTypes.STRING(128),
       },
       id_fornecedor: {
        allowNull:false,
        type: DataTypes.INTEGER
       },
       id_estoque: {
        allowNull: false,
        type: DataTypes.INTEGER
       },
       preco: {
        allowNull: false,
        type: DataTypes.FLOAT(14,2),
       },
       peso: {
        allowNull: false,
        type:DataTypes.FLOAT(14,2)
       },
       unidade_medida: {
        allowNull: false,
        type: DataTypes.STRING(10)
       }


  });

  },


  async down (queryInterface, Sequelize) {
   
await queryInterface.dropTable('product');

  }
};
