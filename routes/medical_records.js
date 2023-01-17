'use strict';

const express = require('express');
const MedicalRecordsController = require('../controllers/medical_records');

const api = express.Router();
// Middlewares (if required)

api.post('/register', MedicalRecordsController.registerNewMedicalRecord);
api.get('/record/:id', MedicalRecordsController.getMedicalRecordById);
api.get('/name/:name', MedicalRecordsController.getMedicalRecordByPatientName);
api.get('/recordNumber/:recordNumber', MedicalRecordsController.getMedicalRecordByRecordNumber);

module.exports = api;