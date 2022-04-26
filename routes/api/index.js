const router = require('express').Router();
const thoughtRoutes = require('./thought');
const userRoutes = require('./user');


// add prefix of `/thought` to routes created in `thought.js`
router.use('/thought', thoughtRoutes);

// add prefix of `/comments` to routes created in `comment.js`
router.use('/user', userRoutes);


module.exports = router;