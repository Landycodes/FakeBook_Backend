const { Schema, model, Types } = require('mongoose');
const date = require('dayjs');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
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
        }
    }
);

//const Reaction = model('reaction', reactionSchema);

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
        reactions: [ reactionSchema ]
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