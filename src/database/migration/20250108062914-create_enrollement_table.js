'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('Enrollments', {
      enrollmentId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      studentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Students',
          key: 'studentId',
        },
        onDelete: 'CASCADE',
      },
      classId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Classes',
          key: 'classId',
        },
        onDelete: 'CASCADE',
      },
      enrollmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
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
    await queryInterface.dropTable('Enrollments');
  },
};
