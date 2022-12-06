//const { ObjectId } = require('mongoose').Types
const {User} = require('../models');

module.exports  = {
    //get all users
    getUsers(req, res) {
        User.find()
        .then((users) => {res.json(users) })
        .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res){
        User.findOne({_id: req.params.userId})
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'User ID not found' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
        .then((UserData) => res.json(UserData))
        .catch((err) => res.status(500).json(err))
    }
}
