const cacheService = require("../services/cache.service");

/**
 * Cache middleware generator.
 * @param {string | function} keyGenerator A static string or a function(req) that returns a string.
 */
const cacheMiddleware = (keyGenerator) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== "GET") {
      return next();
    }

    const key = typeof keyGenerator === "function" ? keyGenerator(req) : keyGenerator;

    const cachedResponse = cacheService.get(key);

    if (cachedResponse) {
      res.set("X-Cache", "HIT");
      // Need to return parsed JSON to client
      return res.json(cachedResponse);
    }

    // Cache Miss
    res.set("X-Cache", "MISS");

    // Intercept res.json to save the response data to cache
    const originalJson = res.json.bind(res);

    res.json = (body) => {
      // Only cache successful responses (e.g. 2xx)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cacheService.set(key, body);
      }
      
      // Call the original res.json to send the response
      return originalJson(body);
    };

    next();
  };
};

module.exports = cacheMiddleware;
