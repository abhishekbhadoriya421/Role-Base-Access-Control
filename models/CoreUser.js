const mongoose = require('mongoose');


const CoreUserSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    employee_id: {
        type: Number,
        required: true
    },
    mobile_number: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        required: true,
        default: 'Active'
    },
    created_at: {
        type: String,
        default: Date.now()
    }
})

module.exports = mongoose.model('CoreUser', CoreUserSchema);