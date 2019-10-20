const express = require('express')
const bodyParser = require('body-parser') //какая-то нужная библиотека для бекенда
const mongoose = require('mongoose') // пакет для работы с БД mongoDB
const passport = require('passport') // пакет для работы с jwt токеном

const passportStrategy = require('./middleware/passport-strategy')
const authRoutes = require('./routes/auth.routes') // подключаем роуты админки
const postRoutes = require('./routes/post.routes') // подключаем роуты постов
const commentRoutes = require('./routes/comment.routes') // подключаем роуты комментариев
const keys = require('./keys') // объект конфигурации
const app = express()

mongoose.connect(keys.MONGO_URI) // коннектимся к БД
  .then(() => console.log('MongoDB connected'))
  .catch((e) => console.log(e))

app.use(passport.initialize()) //инициализация пасспорта
passport.use(passportStrategy) // стратегия защиты и валидации роутов

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes) // регистрация роутов: 1 параметр - путь по какому мы будем обращаться к API, 2 параметр - название импорта
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)

module.exports = app
