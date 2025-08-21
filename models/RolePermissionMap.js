const mongoose = require('mongoose');

const RolePermissionMapSchema = mongoose.Schema({
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    permission_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission',
        required: true
    }
}, {
    timestamps: true
});

RolePermissionMapSchema.index({ role_id: 1, permission_id: 1 }, { unique: true });

module.exports = mongoose.model('RolePermissionMap', RolePermissionMapSchema);