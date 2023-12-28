const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);