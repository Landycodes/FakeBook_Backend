const router = require('express').Router();
const { 
    getThought, 
    getSingleThought, 
    newThought,
    updateThought,
    deleteThought,
    newReaction,
    deleteReaction
} = require('../../controller/thoughtController');

router.route('/')
.get(getThought)
.post(newThought);

router.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

router.route('/:thoughtId/reaction')
.post(newReaction);

router.route('/:thoughtid/reaction/:reactionId')
.delete(deleteReaction);

module.exports = router;