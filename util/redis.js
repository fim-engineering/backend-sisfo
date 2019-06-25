var redis = require('redis')
const { REDISCLOUD_URL } = process.env

const LoginDataRedis = { no_ready_check: 'true' }

//TODO: Check if production env
const RedisClient = REDISCLOUD_URL ? redis.createClient(REDISCLOUD_URL, LoginDataRedis) : redis.createClient();

RedisClient.on('error', err => {
  console.log("error: ", err);
});

RedisClient.on('ready', () => {
  console.log('REDIS is now connected');
});

RedisClient.on('end', () => {
  console.log('REDIS is now disconnected');
});

module.exports = RedisClient;
