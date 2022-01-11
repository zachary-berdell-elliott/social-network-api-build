const { Schema, model } = require('mongoose');
const thoughtSchema = require('thoughts');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            max_length: 45
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: function(e) {
                    return /^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(e);
                },
                message: props => `${props.value} is not an email address.`
            }
        },
        thoughts: [thoughtSchema],
        friends: [userSchema]
    }
)