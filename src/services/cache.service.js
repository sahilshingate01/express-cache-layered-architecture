// In-memory cache using a JavaScript Map
const cache = new Map();

// Default TTL is 1 minute (60000ms), can be overridden in .env
const getTTL = () => {
  return parseInt(process.env.CACHE_TTL_MS, 10) || 60000;
};

const get = (key) => {
  const entry = cache.get(key);
  
  if (!entry) {
    return null; // Cache miss
  }

  const isExpired = Date.now() - entry.createdAt >= getTTL();

  if (isExpired) {
    cache.delete(key);
    return null; // Expired cache is treated as a miss
  }

  return entry.value; // Cache hit
};

const set = (key, value) => {
  cache.set(key, {
    value,
    createdAt: Date.now(),
  });
};

const clear = () => {
  cache.clear();
};

const remove = (key) => {
  cache.delete(key);
};

module.exports = {
  get,
  set,
  clear,
  remove,
};
