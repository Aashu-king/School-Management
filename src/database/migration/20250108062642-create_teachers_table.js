'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('Teachers', {
      teacherId: {
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
        allowNull: true,
      },
      subjectSpecialization: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable('Teachers');
  },
};
