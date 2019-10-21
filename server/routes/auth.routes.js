const {Router} = require('express')
const passport = require('passport')
const {login, createUser} = require('../controllers/auth.controller')
const router = Router()

/**
 * тут перед слешем уже стоит путь /api/auth который определён в файле app.js
 * Второй параметр - функция из контроллеров (её не вызываем, а просто вставляем без вызова)
 * полный путь будет /api/auth/admin/login
 */
router.post('/admin/login', login)

// /api/auth/admin/create
router.post(
  '/admin/create',
  passport.authenticate('jwt', {session: false}),
  createUser)



module.exports = router