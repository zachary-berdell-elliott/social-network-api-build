const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then(thoughts => res.json(thoughts))
            .catch(err => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
            .select('-__v')
            .then(thought => !thought ? res.status(404).json({message: "This thought does not exist."}) : res.json(thought))
            .catch(err => res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then(userArray => {
                return User.findOneAndUpdate(
                    {_id: req.body.userId},
                    {$push: {thoughts: userArray._id}},
                    {new: true}
                )
            })
            .then(thought => res.json(thought))
            .catch(err => res.status(500).json(err));
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
            .then(thought => {
                !thought ? res.status(404).json({message: "This thought does not exist."}) : res.json(thought)
            })
            .catch(err => res.status(500).json(err));
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
            .then(thought => !thought ? res.status(404).json({message: "This thought does not exist."}) : res.json(thought))
            .catch(err => res.status(500).json(err));
    },
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            {__id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        )
        .then(thought => !thought ? res.status(404).json({message: "This thought does not exist."}) : res.json(thought))
        .catch(err => res.status(500).json(err));
    },
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        )
        .then(thought => !thought ? res.status(404).json({message: "This thought does not exist."}) : res.json(thought))
        .catch(err => res.status(500).json(err));
    }
}