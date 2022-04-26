const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .sort({ createdAt: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
              console.log(err);
              res.status(400).json(err);
            });
    },
    // get a single thought by ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
                .then(dbThoughtsData => {
                // If no thoughts is found, send 404
                if (!dbThoughtsData) {
                res.status(404).json({ message: 'No thoughts found with this id!' });
                return;
                }
                res.json(dbPizzaData);
            }).catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // create a new thought
    createThought({ body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        }).then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        }).catch(err => res.json(err));
    },
    // update a thought by ID
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
                }
                res.json(dbThoughtData);
            }).catch(err => res.status(400).json(err));
    },
    // delete thought by ID
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
            }).catch(err => res.status(400).json(err));
    },
    // create a new reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        ).then(dbReactionData => {
            if (!dbReactionData) {
            res.status(404).json({ message: 'No reaction found with this id!' });
            return;
            }
            res.json(dbReactionData);
        }).catch(err => res.json(err));
    },
    // delete reaction by ID
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { replies: { reactionId: params.reactionId } } },
            { new: true }
        ).then(dbReactionData => res.json(dbReactionData))
        .catch(err => res.json(err));
    }
}

module.exports = thoughtController;