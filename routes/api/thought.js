const router = require('express').Router();

const {getThought} = require('../../controller/thoughtController');

router.route('/').get(getThought);

module.exports = router;