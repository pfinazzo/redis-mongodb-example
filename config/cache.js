const redis = require('redis');
const util = require('util');
const mongoose = require('mongoose');

const client = redis.createClient(process.env.REDIS_URL_LOCAL);
// make every method with a callback promisified
const methods = {
  set: util.promisify(client.set).bind(client),
  get: util.promisify(client.get).bind(client),
  hset: util.promisify(client.hset).bind(client),
  hget: util.promisify(client.hget).bind(client)
}

// overwrite the normal methods with promisified ones
for (let key in methods) {
  if (client[key]) {
    client[key] = methods[key];
  }
}

const { exec } = mongoose.Query.prototype;
// add chainable function to mongoose query to make it grab from the cache
mongoose.Query.prototype.cache = function (options = {}) {
  this.hashKey = JSON.stringify(options.key || 'default');
  this.useCache = true;
  return this;
}


/*                   
  1. generate a unique yet consistent key based on the incoming       query to grab/store our cached data at ,
  2. try to grab data from the cache associated with that key
  3. if we have data at that key
    1. parse it
    2. if its an array of docs turn it into an array of model         instances rather than docs and return that array, otherwise    return the single model instance
  4. if we dont have data at that key get the value from the db
  5. set it in the cache 
  6. return the value
*/

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return await exec.apply(this, arguments);
  }
  const { name: collection = null } = this.mongooseCollection || {};
  const key = JSON.stringify({ ...this.getQuery(), collection });
  const cachedData = await client.hget(this.hashKey, key);
  if (cachedData) {
    const parsedCacheData = JSON.parse(cachedData);
    if (Array.isArray(parsedCacheData)) {
      return parsedCacheData.map(doc => new this.model(doc));
    }
    const modelInstance = new this.model(parsedCacheData);
    return modelInstance;
  }
  const value = await exec.apply(this, arguments);
  await client.hset(this.hashKey, key, JSON.stringify(value), 'EX', 10);
  return value;
};

function clearCacheKey(hashKey) {
  console.log('deleting data in cache at key of: ', hashKey);
  client.del(JSON.stringify(hashKey))
}

module.exports = {
  clearCacheKey,
}
