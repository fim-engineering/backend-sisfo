var redis = require('redis')
const { REDIS_HOST, REDIS_PORT, REDIS_USER, REDIS_PASSWORD } = process.env

const LoginDataRedis = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  user: REDIS_USER,
  password: REDIS_PASSWORD,
  no_ready_check: 'true',
}

//TODO: Check if production env
const RedisClient = REDIS_PASSWORD ? redis.createClient(LoginDataRedis) : redis.createClient();

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
