const router = require('express').Router();

router.use('/users', require('./users'));

router.use('/*', (req, res) => res.status(404).json({ message: 'not found' }));

module.exports = router;