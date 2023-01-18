'use strict';

const MedicalRecord = require('../models/medical_records');

MedicalRecord.sync();

const show404 = function(res, mess){
  return res.status(404).json({
    code: 404,
    message: mess
  });
}

const generateMedicalRecordNumber = function()
{
  return Math.floor(Math.random()*90000) + 10000;
}

const registerNewMedicalRecord = function(req, res)
{
  // Get data from body
  const { name, bloodType, allergies } = req.body;
  if (!name || !bloodType || !allergies)
  {
    throw show404(res, 'Some fields are missing.');
  }

  // Create new medical record in the database
  MedicalRecord.create({
    recordNumber: generateMedicalRecordNumber(),
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
    console.log({err});
  });
}

const getMedicalRecordById = function(req, res)
{
  // Find the medical record in the database by id
  MedicalRecord.findByPk(req.params.id).then(record => {
    if (!record) {
      throw show404(res, 'The record was not found.');
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
    console.log({err});
  });
}

const getMedicalRecordByPatientName = function(req, res)
{
  // Find the medical record in the database by name
  MedicalRecord.findOne({where: {name: req.params.name}}).then(name => {
    if (!name) {
      throw show404(res, 'The record was not found.');
    }
    res.json({
      id: name.id,
      createdAt: name.createdAt,
      lastAppointment: name.lastAppointment,
      name: name.name,
      bloodType: name.bloodType,
      allergies: name.allergies
    });
  }).catch(err => {
    console.log({err});
  });
}

const getMedicalRecordByRecordNumber = function(req, res)
{
  // Find the medical record in the database by record number
  MedicalRecord.findOne({where: {recordNumber: req.params.recordNumber}}).then(recordNumber => {
    if (!recordNumber) {
      throw show404(res, 'The record was not found.');
    }
    res.json({
      id: recordNumber.id,
      recordNumber: recordNumber.recordNumber,
      createdAt: recordNumber.createdAt,
      lastAppointment: recordNumber.lastAppointment,
      name: recordNumber.name,
      bloodType: recordNumber.bloodType,
      allergies: recordNumber.allergies
    });
  }).catch(err => {
    console.log({err});
  });
}

module.exports = {
  registerNewMedicalRecord,
  getMedicalRecordById,
  getMedicalRecordByPatientName,
  getMedicalRecordByRecordNumber
}