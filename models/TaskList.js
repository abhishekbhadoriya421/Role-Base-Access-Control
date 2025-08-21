const mongoose = require('mongoose');

const TaskListSchema = mongoose.Schema({
    task_name: {
        type: String,
        required: true,
        trim: true
    },
    task_description: {
        type: String,
        required: true,
        trim: true
    },
    task_status: {
        type: String,
        required: true,
        enum: ['Pending', 'In-Progress', 'Completed'],
        default: 'Pending'
    },
    task_priority: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    task_assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CoreUser',
        required: true
    },
    due_date: {
        type: Date,
    },
    task_created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoginUser',
        // required: true
    },
    task_updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoginUser',
        // required: true
    },
    task_created_at: {
        type: Date,
        default: Date.now
    },
    task_updated_at: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('TaskList', TaskListSchema);