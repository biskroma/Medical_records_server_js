const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const {DataTypes} = require('sequelize');
const uuid = require('uuid');

// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MySQL database using Sequelize
const db = new sequelize('patient_records', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false
  }
});

// Define a MedicalRecord model for the database
const MedicalRecord = db.define('medical_record', {
  id: {
    type: sequelize.UUID,
    defaultValue: sequelize.UUIDV4,
    primaryKey: true
  },
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

// Sync the MedicalRecord model with the database
MedicalRecord.sync();

// Handle a POST request to register a new medical record
app.post('/register', (req, res) => {
  const { name, bloodType, allergies } = req.body;
  if (!name || !bloodType || !allergies) {
    return res.status(400).json({
      code: 400,
      message: 'Missing required fields'
    });
  }

  // Create a new medical record in the database
  MedicalRecord.create({
    name,
    bloodType,
    allergies,
    createdAt: new Date(),
    lastAppointment: new Date()
  }).then(record => {
    res.json({
      id: record.id,
      message: `Medical record ${record.id} has been registered`
    });
  }).catch(err => {
    res.status(500).json({
      code: 500,
      message: `Internal error: ${err}`
    });
  });
});

// Handle a GET request to consult a medical record
app.get('/record/:id', (req, res) => {
  // Find the medical record in the database by id
  MedicalRecord.findByPk(req.params.id).then(record => {
    if (!record) {
      return res.status(404).json({
        code: 404,
        message: 'Medical record not found'
      });
    }
    res.json({
      id: record.id,
      createdAt: record.createdAt,
      lastAppointment: record.lastAppointment,
      name: record.name,
      bloodType: record.bloodType,
      allergies: record.allergies
    });
  }).catch(err => {
    res.status(500).json({
      code: 500,
      message: `Internal error: ${err}`
    });
  });
});

// Start the server on port 3003
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});