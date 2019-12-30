const router = require('express').Router();

const {
  all,
  createUser
} = require('../../controllers/users');

router.get('/all', all);
router.post('/create', createUser);

module.exports = router;