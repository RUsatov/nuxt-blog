const {Schema, model} = require('mongoose')

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now // не вызываем, будет вызываться когда пост создадут
  },
  views: {
    type: Number,
    default: 0
  },
  imageUrl: String,
  comments: [
    {
      type: Schema.Types.ObjectId, // создаем ID поста ?
      ref: 'comments' // забираем комментарий определенного поста из нужной таблицы
    }
  ]
})

module.exports = model('posts', postSchema)