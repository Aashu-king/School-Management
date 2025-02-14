'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('teachers_details',{
      detailId : {
        type : DataTypes.UUID,
        allowNull : false,
        primaryKey : true,
        defaultValue : DataTypes.UUIDV4,
      },
      teacherId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Teachers',
          key: 'teacherId',
        },
        onDelete: 'CASCADE',  
      },
      martialStatus : {
        type : DataTypes.STRING(100),
        allowNull : false
      },

      husbandName : {
        type : DataTypes.TEXT,
        allowNull :true
      },

      wifeName : {
        type : DataTypes.TEXT,
        allowNull :true
      },

      bloodgroup : {
        type : DataTypes.STRING(100),
        allowNull : true
      },
      dob : {
        type : DataTypes.DATE,
        allowNull : false
      },
      address : {
        type : DataTypes.STRING(100),
        allowNull : false
      },
      degree : {
        type : DataTypes.STRING(100),
        allowNull : false
      },
      status: {
        type: DataTypes.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active',
      },
      joinedIn: {
        type : DataTypes.DATE,
        allowNull : false
      },
      leftAt : {
        type : DataTypes.DATE,
        allowNull : true
      },
      worksAs: {
        type : DataTypes.STRING(100),
        allowNull : false
      },
      pastExperience : {
        type : DataTypes.TEXT,
        allowNull :true
      },
      resume : {
        type : DataTypes.STRING,
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
   await queryInterface.dropTable('teachers_details');
  }
};
