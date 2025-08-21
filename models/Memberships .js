const mongoose = require('mongoose');

const MembershipsSchema = mongoose.Schema({
    organization_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    }
});

MembershipsSchema.index({ organization_id: 1, user_id: 1, role_id: 1 }, { unique: true });

module.exports = mongoose.model('Memberships', MembershipsSchema);