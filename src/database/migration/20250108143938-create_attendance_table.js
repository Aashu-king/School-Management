'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('Attendance', {
      attendanceId: {
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
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('Present', 'Absent', 'Late', 'Excused'),
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
    await queryInterface.dropTable('Attendance');
  },
};
