const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

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
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }],

    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;