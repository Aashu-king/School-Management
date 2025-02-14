'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('parents_details',{
      parentId : {
        type : DataTypes.UUID,
        allowNull : false,
        primaryKey : true,
        defaultValue : DataTypes.UUIDV4,
      },
      studentId: {
        type : DataTypes.UUID,
        allowNull : false,
        references : {
          model : 'Students',
          key : 'studentId'
        },
        onDelete : 'CASCADE'
      },
      fullName : {
        type : DataTypes.TEXT,
        allowNull :false
      },
      relation : {
        type : DataTypes.STRING(100),
        allowNull : false
      },
      bloodgroup : {
        type : DataTypes.STRING(100),
        allowNull : true
      },
      phonenumber : {
        type : DataTypes.STRING(100),
        allowNull : false
      },
      dob : {
        type : DataTypes.DATE,
        allowNull : false
      },
      address : {
        type : DataTypes.STRING(100),
        allowNull : false
      },
      worksAt : {
        type : DataTypes.STRING(100),
        allowNull : false
      },
      worksAs: {
        type : DataTypes.STRING(100),
        allowNull : true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    })
  },

  async down (queryInterface, Sequelize) {

   await queryInterface.dropTable('parents_details');
  
  }
};
