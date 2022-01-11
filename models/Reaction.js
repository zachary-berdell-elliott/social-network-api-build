const { Schema, Types } = require('mongoose');

const rectionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: d => d.toLocaleDateString('en-us', {year: "numeric", month: "2-digit", day: "2-digit"})
        }
    }
)