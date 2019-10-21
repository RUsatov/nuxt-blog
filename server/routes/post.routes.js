const passport = require('passport')
const {Router} = require('express')
const upload = require('../middleware/upload') // миддлвара
const ctr = require('../controllers/post.controller') // контроллер постов
const router = Router()

// Admin
// /api/post/admin
router.post(
  "/admin/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"), // добавляем одну картинку из поля image. Это поле мы аппендим из стора store/post.js
  ctr.create
);

router.get(
  '/admin/',
  passport.authenticate('jwt', {session: false}),
  ctr.getAll
)

router.get(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  ctr.getById
)

router.put(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  ctr.update
)

router.delete(
  '/admin/:id',
  passport.authenticate('jwt', {session: false}),
  ctr.remove
)

// Base
// /api/post/
router.get('/', ctr.getAll)
router.get("/:id", ctr.getById)

router.put('/add/view/:id', ctr.addView)

module.exports = router