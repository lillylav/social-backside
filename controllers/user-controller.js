const { Thought, User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find()
            .sort({ createdAt: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
              console.log(err);
              res.status(400).json(err);
            });
    }, 
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then((dbUserData) => {
                if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
        });
    }, 
    createUser, 
    updateUser, 
    deleteUser, 
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
            .then((dbUserData) => {
                if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    removeFriend 

};

module.exports = userController;