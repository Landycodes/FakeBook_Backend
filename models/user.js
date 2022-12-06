const { Schema, model } = require('mongoose');
//const thoughtSchema = require('./thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            //unique: true,
            required: true,
            trim: true

        },
        email: {
            type: String,
            required: true,
            //unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
        //virtual called friendCount gets length of user's friends array on query
    }
);
//CANNOT GET VIRTUALS TO WORK ANYWHERE
userSchema
.virtual('friendCount')
.get(function() { return this.friends.length });

const User = model('user', userSchema);

module.exports = User;