'use strict';

const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');
const uuid = require('uuid');

// Connect to MySQL database using Sequelize
const db = new sequelize('patient_records', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});

// Schema for each medical record
const MedicalRecordSchema = db.define('medical_record', {
    id: {
      type: sequelize.UUID,
      defaultValue: sequelize.UUIDV4,
      primaryKey: true
    },
    recordNumber: sequelize.NUMBER,
    name: sequelize.STRING,
    bloodType: sequelize.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    allergies: {
      type: DataTypes.JSON,
      allowNull: false
    },
    createdAt: sequelize.DATE,
    lastAppointment: sequelize.DATE
  }, 
  {
    timestamps: false
  });

MedicalRecordSchema.sync();

module.exports = MedicalRecordSchema;