const { Schema, Types } = require('mongoose');
const date = require('dayjs');

const reactionSchema = new Schema(
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
            get: v => date(v).format('MM/DD/YYYY h:mmA')
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);


module.exports = reactionSchema;