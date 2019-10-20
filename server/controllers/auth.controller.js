const bcrypt = require('bcrypt-nodejs') // кодирует пароль пользователя
const jwt = require('jsonwebtoken') // создаёт токен
const keys = require('../keys')
const User = require('../models/user.model')

// req - request (запрос), res - response (ответ)
module.exports.login = async (req, res) => {
  const candidate = await User.findOne({ login: req.body.login }) // ищем ОДНОГО пользователя по логину

  if (candidate) {
    // Ф-ия compareSync сравнивает пароли введёный и существующий в базе. Возвращает Boolean значение (совпадают пароли или нет)
    // Первый параметр - пароль, который мы передаём с фронтенда, второй - то что лежит в БД.
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, candidate.password)

    if (isPasswordCorrect) {
      // первый параметр (объект) - то, что мы хотим зашифровать в токене
      // второй параметр - секретная переменная
      // третий параметр - сколько по времени будет жить этот токен ( 60 * 60 - это 1 час)
      const token = jwt.sign({
        login: candidate.login,
        userId: candidate._id
      }, keys.JWT, {expiresIn: 60 * 60})

      // статус 200 идёт по умолчанию, поэтому res.status(200) можно не писать
      res.json({token})
    } else {
      res.status(401).json({message: 'Пароль не верный'}) // лучше не передавать 401 еще и с надписью про Пароль. Использовать лучше 404 "Пользователь не найден"
    }

  } else {
    res.status(404).json({message: 'Пользователь не найден'})
  }
}

module.exports.createUser = async(req, res) => {
  const candidate = await User.findOne({ login: req.body.login })

  if (candidate) {
    res.status(409).json({ message: 'Пользователь с таким именем уже существует'})
  } else {
    const salt = bcrypt.genSaltSync(10) // скорее всего для того чтобы обозначить сколько символов будет зашифрованный пароль
    const user = new User({
      login: req.body.login,
      password: bcrypt.hashSync(req.body.password, salt)
    })

    await user.save() // сохраняет параметры в базе которые мы передавали в user
    res.status(201).json(user) // 201 статус для того когда что-то успешно создаётся
  }
}