const mongoose = require('mongoose');

const PermissionSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Permission', PermissionSchema);