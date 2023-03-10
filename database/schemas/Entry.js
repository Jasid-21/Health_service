const { Schema } = require('mongoose');

const entrySchema = new Schema({
    patient: {
        id: {type: Schema.Types.ObjectId, required: true},
        name: {type: String, required: true}
    },

    doctor: {
        id: {type: Schema.Types.ObjectId, required: true},
        name: {type: String, required: true}
    },

    hospital: {
        id: {type: Schema.Types.ObjectId, required: true},
        name: {type: String, required: true}
    }
});

module.exports = entrySchema;
