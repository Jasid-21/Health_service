const express = require('express');
const router = express.Router();
const { validate_session } = require('../utils');
const { User, Entry }  = require('../database/mongo');

router.get('/getEntries', validate_session, async function(req, resp) {
    const role = req.query.myrole;
    const cc = req.query.mycc;
    const entries = {entries: []};

    const details = 'patient.name hospital.name doctor.name speciality observations health_status';
    try {
        if (role == 'patient') {
            entries.entries = await Entry.find({'patient.id': cc}, details).exec();
        }
    
        if (role == 'doctor') {
            entries.entries = await Entry.find({'doctor.id': cc}, details).exec();
        }
    
        if (role == 'hospital') {
            entries.entries = await Entry.find({'hospital.id': cc}, details).exec();
        }
    
        resp.status(200).send(entries);
    } catch (error) {
        console.error(error);
        resp.status(500).send({msg: "Internal server error. Please try again..."});
    }
    
});

router.post('/newEntry', validate_session, async function(req, resp) {
    const role = req.body.myrole;
    const doctor_id = req.body.mycc;
    const doctor_name = req.body.myname;
    const patient_id = req.body.patient_id;
    const patient_name = req.body.patient_name;
    const observations = req.body.observations;
    const health_status = req.body.health_status;

    if (role != 'doctor') {
        resp.status(400).send({msg: 'Invalid request. You need to be doctor to do this...'});
        return;
    }

    const details = await User.findOne({cc: doctor_id}, 'hospital speciality');

    try {
        const newEntry = new Entry({
            patient: {
                id: patient_id,
                name: patient_name
            },
    
            doctor: {
                id: doctor_id,
                name: doctor_name
            },
    
            hospital: {
                id: details.hospital.cc,
                name: details.hospital.name
            },
            speciality: details.speciality,
            observations,
            health_status
        });
        newEntry.save();
        resp.status(200).send({msg: 'New entry added!!'});

    } catch(error) {
        console.error(error);
        resp.status(500).send({msg: "Server error. Please try again..."});
        return;
    }
});

module.exports = router;
