'use strict';

const MedicalRecord = require('../models/medical_records');

MedicalRecord.sync();

const show404 = function(res, mess){
  return res.status(404).json({
    code: 404,
    message: mess
  });
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
    res.status(500).json({
      code: 500,
      message: `Internal error: ${err}`
    });
  });
}

module.exports = {
  registerNewMedicalRecord,
  getMedicalRecordById
}