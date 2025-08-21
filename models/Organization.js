const mongoose = require('mongoose');

const OrganizationSchema = mongoose.Schema({
    ou_name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Organization', OrganizationSchema);