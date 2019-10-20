const passport = require('passport')
const {Router} = require('express')
const ctr = require('../controllers/post.controller')
const router = Router()

// Admin
// /api/post/admin
router.post(
  '/admin/',
  passport.authenticate('jwt', {session: false}),
  ctr.create
)

router.get(
  '/admin/',
  passport.authenticate('jwt', {session: false}),
  ctr.getAll
)

// Base
// /api/post/

module.exports = router