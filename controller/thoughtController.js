const {User, Thought} = require('../models');

module.exports = {
    //get all thoughts api/thoughts
    getThought(req, res) {
        Thought.find()
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err))
    },
    // GET api/thoughts/:thoughtId
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .then((thought) => {
            !thought
            ? res.status(404).json({message: 'Thought ID not found'})
            : res.json(thought)
        })
        .catch((err) => res.status(500).json(err))
    },
    //POST api/thoughts
    /*JSON BODY
    {
        "userId": "",
        "thoughtText": "",
        "username": ""
    } */
    newThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id }},
                { new: true }
            )

        })
        .then((user) => {
            !user
                ? res.status(404).json({message: 'Anonymous post made :/'})
                : res.json('Post created 🎉')
        })
        .catch((err) => res.status(500).json(err))
    },
    //PUT api/thoughts/:thoughtId
    /*JSON BODY
    {
        "ANYthoughtObj": "new value"
    } */
    updateThought(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, req.body)
        .then((thought) => {
            !thought
                ? res.status(404).json({message: 'Thought ID not found'})
                : res.json({message: 'Thought has been updated! 🎉'})
        })
    },
    //DELETE api/thoughts/:thoughtId
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then((thought) => {
            !thought
            ? res.status(404).json({message: 'Thought ID not found'})
            : res.json({message: 'Thought has been destroyed!'}) 
        })
    },
    //POST thoughts/:thoughtId/reaction
    /*JSON BODY {
        "reactionBody": "",
        "username": ""
    } */
    newReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$push: { reactions: req.body }},
            {new: true}
        )
        .then((thought) => {
            !thought
                ? res.status(404).json({message: 'Thought ID not found'})
                : res.json([{message: 'reaction has been posted! 🎉'}, {reaction: thought}])
        })
        .catch((err) => res.status(500).json(err))
    },
    //Delete thoughts/:thoughtId/reaction/:reactionId
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { new: true, runValidators: true }
        )
        .then((thought) => {
            !thought
                ? res.status(404).json({message: 'Reaction ID not found'})
                : res.json([{message: 'Reaction has been removed! 🎉'}, {thought}])
        })
        .catch((err) => res.status(500).json(err))       
    }
}
//delete reaction keeps giving error 404 because of $pull