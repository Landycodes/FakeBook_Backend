const { Schema, model } = require('mongoose');
const date = require('dayjs');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: v => date(v).format('MM/DD/YYYY h:mmA')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'reaction'
            } 
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtSchema
.virtual('reactionCount')
.get(function() { return this.reactions.length });


const Thought = model('thought', thoughtSchema);

module.exports = Thought;