const { Schema, model } = require('mongoose');

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
            
            //getter method to format time on query
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
            virtuals: true
        },
        id: false
        //virtual called reactionCount that gets length of thoughts reactions array on query
    }
);

//CANNOT FIGURE OUT HOW TO FORMAT TIME ANYWHERE
thoughtSchema
.virtual('reactionCount')
.get(function() { return this.reactions.length });


const Thought = model('thought', thoughtSchema);

module.exports = Thought;