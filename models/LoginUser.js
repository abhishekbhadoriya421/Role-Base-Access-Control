const mongoose = require('mongoose');

const LoginUserSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    user_password: {
        type: String,
        required: true,
    },
    mobile_number: {
        type: Number,
        required: true,
        validator: {
            validate: function (v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
    created_at: {
        type: String,
        default: Date.now()
    }
}, { timestamps: true });
module.exports = mongoose.model('LoginUser', LoginUserSchema);