const path = require('path')
const multer = require('multer')
const moment = require('moment') // библиотека для работы с датой

const storage = multer.diskStorage({
  // куда положить файл когда он загрузится
  destination(req, file, cb) {
    // второй параметр у колбек функции (cb) путь.
    // __dirname это хз, а дальше папка куда будет загружен файл, тоесть в папку статик (можно написать одной строкой а не через запятую)
    cb(null, path.resolve(__dirname, '../..', 'static')) // в ноде первый параметр - параметр ошибки (null)
  },
  filename(req, file, cb) {
    // передаём название файла и делаем его оригинальным при помощи даты чтобы данные не перетирались
    cb(null, `${file.originalname}-${moment().format('DDMMYYYY-HHmmss_SSS')}`)
  }
})
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true); // если файл соответствует расширению то валидация проходит
  } else {
    cb(null, false); // а тут не проходит
  }
};

module.exports = multer({
  storage, fileFilter, limits: {fileSize: 1024 * 1024 * 5}
})