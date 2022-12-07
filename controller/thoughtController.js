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
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err))
    },
    //POST api/thoughts JSON body needs "userId":
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
    }
}
//I THINK REACTION MODEL IS CREATED HERE