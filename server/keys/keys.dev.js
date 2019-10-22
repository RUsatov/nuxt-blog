module.exports = {
  // MONGO_URI: `mongodb+srv://Kengda:fng8Gd9s@nuxt-blog-7hzd2.mongodb.net/test?retryWrites=true&w=majority`,
  MONGO_URI: `mongodb://Kengda:fng8Gd9s@nuxt-blog-shard-00-00-7hzd2.mongodb.net:27017,nuxt-blog-shard-00-01-7hzd2.mongodb.net:27017,nuxt-blog-shard-00-02-7hzd2.mongodb.net:27017/test?ssl=true&replicaSet=nuxt-blog-shard-0&authSource=admin&retryWrites=true&w=majority`,
  JWT: 'dev-jwt-key', // любая рандомная строка
}