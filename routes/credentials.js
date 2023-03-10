const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const { create_token } = require('../utils');
const { User } = require('../database/mongo');


router.use(cors({origin: '*'}));
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get('/login', async function(req, resp) {
    const username = req.query.username;
    const password = req.query.password;

    try {
        const data = await User.findOne({username: username + "2"}).exec();
        if (data == null) {
            resp.status(404).send({msg: 'Username not not found...'});
            return;
        }


    } catch(error) {
        console.error(error);
        return;
    }
});

router.post('/register', async function(req, resp) {
    console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    const address = req.body.address;

    if (username == '' || password == '' || role == '' || address == '') {
        resp.status(400).send({msg: "Every field must be filled..."});
        return;
    }

    try {
        const data = await User.findOne({username}).exec();
        if (data != null) {
            resp.status(409).send({msg: 'This username alredy exist...'});
            return;
        }

        const session = create_token(30);
        const newUser = new User({
            username,
            password,
            role,
            address,
            sessions: [session]
        });
        newUser.save();

        resp.status(200).send();
    } catch(error) {
        console.error(error);
        resp.status(500).send({msg: "Server error. Try again..."});
        return;
    }
});

module.exports = router;
