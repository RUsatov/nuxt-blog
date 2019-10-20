const {Strategy, ExtractJwt} = require('passport-jwt')
// const {model} = require('mongoose')
const keys = require('../keys')
// const User = model('users') // получили пользователей (забрали у mongoose - 2 строка)
const User = require('../models/user.model') // получили пользователей (забрали у mongoose - 2 строка)

// jwtFromRequest - в хедере будет Autherization: Bearer afsas.saasfgasg.asf
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT
}

// payload мы берём с auth.controller из переменной token функции login
module.exports = new Strategy(options, async (payload, done) => {
  try {
    const candidate = await User.findById(payload.userId).select('id')

    if (candidate) {
      done(null, candidate) // валидный токен
    } else {
      done(null, false) // не валидный токен
    }
  } catch (e) {
    console.error(e);
  }
})