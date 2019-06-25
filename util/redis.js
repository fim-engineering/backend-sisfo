var redis = require('redis')

const LoginDataRedis = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  user: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
  no_ready_check: 'true',
}

const RedisClient = redis.createClient(LoginDataRedis);

RedisClient.on('error', err => {
  console.log(err);
});

RedisClient.on('ready', () => {
  console.log('REDIS is now connected');
});

RedisClient.on('end', () => {
  console.log('REDIS is now disconnected');
});

exports.RedisClient;
