const router = require('express').Router()

router.use('/trips', require('./api/trips'))
router.use('/users', require('./api/users'))


module.exports = router