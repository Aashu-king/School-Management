'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('Students', {
      studentId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bloodgroup: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rollNo : {
        type : DataTypes.STRING,
        allowNull : true
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      registrationdate : {
        type : DataTypes.DATE,
        allowNull :false,
      },
      gender: {
        type: DataTypes.ENUM('Male', 'Female', 'Other'),
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('Active', 'Inactive'),
        allowNull: false,
        defaultValue: 'Active',
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
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Students');
  },
};
