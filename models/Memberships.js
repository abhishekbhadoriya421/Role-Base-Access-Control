const mongoose = require('mongoose');

const MembershipsSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoginUser',
        required: true
    },
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    }
}, { timestamps: true });

MembershipsSchema.index({ user_id: 1, role_id: 1 }, { unique: true });

module.exports = mongoose.model('Memberships', MembershipsSchema);