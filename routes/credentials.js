const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const { create_token, validate_session } = require('../utils');
const { User } = require('../database/mongo');


router.use(cors({origin: '*'}));
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post('/login', async function(req, resp) {
    const cc = req.body.cc;
    const password = req.body.password;

    try {
        const data = await User.findOne({cc}).exec();
        if (data == null) {
            resp.status(404).send({msg: 'User not not found...'});
            return;
        }

        if (!bcrypt.compareSync(password, data.password)) {
            resp.status(404).send({msg: 'User not not found...'});
            return;
        }

        const session = create_token(30);
        data.sessions.push(session);
        data.save();

        resp.status(200).send({role: data.role, session, username: data.name});
    } catch(error) {
        console.error(error);
        return;
    }
});

router.post('/logout', validate_session, async function(req, resp) {
    const session = req.body.mysession;
    const cc = req.body.mycc;

    try {
        const user = await User.findOne({sessions: session, cc}, 'sessions').exec();
        const index = user.sessions.findIndex(item => item == session);
        user.sessions.splice(index, 1);

        user.save();

        resp.status(200).send();
    } catch (error) {
        console.error(error);
        resp.status(500).send({msg: 'Internal server error. Please try again...'});
    }
});

router.post('/register', async function(req, resp) {
    const name = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    const cc = req.body.cc;
    const email = req.body.email;
    const tel = req.body.tel;
    const address = req.body.address;

    if (name == '' || password == '' || role == '' || address == '') {
        resp.status(400).send({msg: "Every field must be filled..."});
        return;
    }

    try {
        const data = await User.findOne({cc}).exec();
        if (data != null) {
            resp.status(409).send({msg: 'This DNI alredy exist...'});
            return;
        }

        const session = create_token(30);
        const new_pass = bcrypt.hashSync(password, 10);
        const newUser = new User({
            name, password: new_pass,
            role, cc, email, tel,
            address, sessions: [session],
            confirmed: false, owner: true
        });

        newUser.save();

        resp.status(200).send({session});
    } catch(error) {
        console.error(error);
        resp.status(500).send({msg: "Server error. Try again..."});
        return;
    }
});

router.post('/newDoctor', validate_session, function(req, resp) {
    const myRole = req.body.myrole;
    const name = req.body.username;
    const cc = req.body.cc;
    const email = req.body.email;
    const tel = req.body.tel;
    const address = req.body.address;
    const speciality = req.body.speciality;
    const hospital_id = req.body.mycc;
    const hospital_name = req.body.myname;

    if (myRole != 'hospital') {
        resp.status(400).send({msg: "Invalid request. You don't have permission to do this..."});
        return;
    }
    
    try {
        const password  = create_token(10);
        const hashed = bcrypt.hashSync(password, 10);
        const newDoctor = new User({
            name, password: hashed,
            role: 'doctor', cc, email,
            tel, address, speciality,
            owner: false, confirmed: false,
            hospital: {cc: hospital_id, name: hospital_name}
        });
    
        newDoctor.save();

        resp.status(200).send({password});
    } catch (error) {
        console.error(error);
        resp.status(500).send({msg: "Server error. Please try again..."});
    }
    
});

module.exports = router;
