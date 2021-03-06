const { User, Thought } = require('../models');

module.exports = {
    getUsers(req, res) {
        User.find()
            .then(users => res.json(users))
            .catch(err => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId})
            .select('-__v')
            .then(user => !user ? res.status(404).json({message: "This user does not exist."}) : res.json(user))
            .catch(err => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then(user => res.json(user))
            .catch(err => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
            .then(user => !user ? res.status(404).json({message: "This user does not exist."}) : res.json(user))
            .catch(err => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
            .then(user => {
                if(!user) res.status(404).json({message: "This user does not exist"})
                else {
                    console.log(user);
                    user.thoughts.forEach(thought => {
                        console.log(thought)
                        Thought.deleteOne({_id: thought}, err => {if (err) throw err})
                    }); 
                    res.json({message: "The user and associated thoughts have been deleted."})
                }
            })
            .catch(err => res.status(500).json(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.body}},
            {runValidators: true, new: true}
        )
            .then(user => !user ? res.status(404).json({message: "This user does not exist"}) : res.json(user))
            .catch(err => res.status(500).json(err));
    },
    removeFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
            .then(user => !user ? res.status(404).json({message: "This user does not exist"}) : res.json(user))
            .catch(err => res.status(500).json(err));
    }
}