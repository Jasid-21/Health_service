const { Schema } = require('mongoose');

const specialitySchema = new Schema({
    name: {type: String, required: true}
});

module.exports = specialitySchema;
