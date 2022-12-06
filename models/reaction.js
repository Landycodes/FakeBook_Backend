const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new Schema.Types.ObjectId
            //Default value is set to a new ObjectId
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
            default: Date.now
            //getter method to format timestamp on query
        }
    }
);
//I DONT THINK THIS MODEL IS SUPPOSED TO BE YEAR

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;