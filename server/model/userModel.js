const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: function (email) {
            return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
        },
        message: props => `${props.value} is not a valid email`
    },
    password: {
        type: String,
        required: true,
    },
    isAvatar: { type: Boolean, default: false },
    avatar: { type: String, default: "" },
})

module.exports = mongoose.model('User', userSchema);