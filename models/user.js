const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: (value) => {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
    }
},
{
    timestamps: true,
    strict: true
})

module.exports = mongoose.model('user', userSchema, 'users')