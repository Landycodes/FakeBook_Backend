const router = require('express').Router();

const { getThought, getSingleThought, newThought } = require('../../controller/thoughtController');

router.route('/').get(getThought).post(newThought);

router.route('/:thoughtId').get(getSingleThought)

module.exports = router;