const { Schema } = require('mongoose');

const entrySchema = new Schema({
    patient: {
        id: {type: String, required: true},
        name: {type: String, required: true}
    },

    doctor: {
        id: {type: String, required: true},
        name: {type: String, required: true}
    },

    hospital: {
        id: {type: String, required: true},
        name: {type: String, required: true}
    },
    speciality: {type: String, required: true},
    observations: {type: String, required: true},
    health_status: {type: String, required: true}
});

module.exports = entrySchema;
