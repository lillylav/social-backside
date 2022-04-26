const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// get all thoughts, get thought by id, create thought, update thought, delete thought, add reaction, remove reaction

// /api/thought/
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

// /api/thought/<thoughtId>
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/thought/<thoughtId>/reaction
router.route('/:thoughtId/reaction')
    .post(addReaction);

// /api/thought/<thoughtId>/reaction/<reactionId>
router.route('/:thoughtId/reaction/:reactionId')
    .delete(removeReaction);

module.exports = router;