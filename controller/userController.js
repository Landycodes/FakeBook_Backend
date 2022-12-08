const { User, Thought } = require('../models');

module.exports  = {
    //get all users api/users
    getUsers(req, res) {
        User.find()
        .select('-__v')
        .then((users) => {res.json(users) })
        .catch((err) => res.status(500).json(err));
    },
    //GET api/users/:userId
    getSingleUser(req, res){
        User.findOne({_id: req.params.userId})
        .select('-__v')
        .populate('thoughts')
        .populate('friends')
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'User ID not found' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    },
    //POST api/users
    /*JSON BODY
      {
        "username": "",
	    "email": ""
    } */
    createUser(req, res) {
        User.create(req.body)
        .then((UserData) => res.json(UserData))
        .catch((err) => res.status(500).json(err))
    },
    //PUT api/users/:userId
    /*JSON BODY
    {
        "anyObjfromThoughtId": "NewValue"
    } */
    updateUser(req, res) {
        User.findOneAndUpdate({_id: req.params.userId}, req.body)
        .select('-__v')
        .then((UserData) =>{ 
            !UserData
                ? res.status(404).json({ message: 'User ID not found' })
                : res.json({message: `User ${UserData._id} has been updated! 🎉`})
        })
        .catch((err) => res.status(500).json(err))
    },
    //DELETE api/users/:userId
    //delete associated thoughts aswell
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
        .select('-__v')
        .then((UserData) => {
            !UserData
                ? res.status(404).json({ message: 'User ID not found' })
                : Thought.deleteMany({username: UserData.username})
                .then(() => res.json({message: `User and user thoughts have been deleted!`}))
        })
        .catch((err) => res.status(500).json(err))  
    },
    //POST api/users/:userId/friends/:friendsId
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId} },
            {new: true}
            )
            .select('-__v')
            .then((userData) => {
                !userData
                    ? res.json(404).json({message: 'friendship not made :('})
                    : res.json({message: 'friendship has been established :) 🎉'})
            })
            .catch((err) => res.status(500).json(err))

    },
    // DELETE api/users/:userId/friends/:friendsId
    removeFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: { friends: req.params.friendId }},
            {new: true}
        )
        .select('-__v')
        .then((userData) => {
            !userData
                ? res.json(404).json({message: 'User ID not found'})
                : res.json({message: 'friendship has been destroyed :|'})
        })
        .catch((err) => res.status(500).json(err))
    }
}
