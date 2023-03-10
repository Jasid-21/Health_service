const { Schema } = require('mongoose');

const UserSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
    cc: {type: String, required: true},
    email: {type: String, required: true},
    tel: {type: String, required: true},
    address: {type: String, required: true},
    born_date: {type: Date, required: false},
    services: [{type: String, required: false}],
    speciality: {type: String, required: false},
    sessions: [{type: String, required: false}]
});

module.exports = UserSchema;
