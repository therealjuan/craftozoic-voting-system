const router = require('express').Router();

const controller = require('./vote.controller');

router.route('/vote/:id').get(controller.readVotes);
router.route('/vote/:id/add').get(controller.voteItem);
router.route('/update').get(controller.updateIds);

module.exports = router;
