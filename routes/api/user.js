const router = require('express').Router();

const { 
    getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser, 
    addFriend, 
    removeFriend 
} = require('../../controllers/user-controller');

// /api/user/
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// /api/user/<userId>
router.route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/user/MY<userId>/friends/FRIEND<userId>
router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;