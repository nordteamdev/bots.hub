import asyncRedis from 'async-redis';
import RedisSerializer from './serializer';

export default class {
  constructor(henta) {
    this.henta = henta;
    this.serializer = new RedisSerializer(this);
    this.redisCache = new Map();
  }

  async init(henta) {
    this.settings = await henta.util.loadSettings('redis.json');
    this.client = asyncRedis.createClient();
  }

  async get(key) {
    const data = this.redisCache.get(key) || await this.client.get(`${this.settings.tag}::${key}`);
    this.redisCache.set(key, data);

    return data;
  }

  set(key, value) {
    this.redisCache.set(key, value);
    return this.client.set(`${this.settings.tag}::${key}`, value);
  }

  del(key) {
    this.redisCache.delete(key);
    return this.client.del(`${this.settings.tag}::${key}`);
  }

  async getObject(key) {
    const raw = await this.get(key);
    return raw && JSON.parse(raw);
  }

  setObject(key, value) {
    return this.set(key, JSON.stringify(value));
  }
}
