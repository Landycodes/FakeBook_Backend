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
        Thought.findOne({_id: req.params.thoughtId})//thought id is associated with route i dont have set up yet
    },
    //POST api/thoughts
    newThought(req, res) {
        
    }
}
//I THINK REACTION MODEL IS CREATED HERE