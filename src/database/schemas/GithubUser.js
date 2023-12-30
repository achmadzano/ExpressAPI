const mongoose = require('mongoose');

const GitHubUserSchema = new mongoose.Schema({
    githubId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model('github_users', GitHubUserSchema);