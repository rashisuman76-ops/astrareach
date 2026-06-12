// Tiny in-memory rate limiter. Replace with redis-backed limiter for prod.
const WINDOW_MS = 60 * 1000;
const MAX = 120;
const hits = new Map();

module.exports = function rateLimit(req, res, next) {
  const key = req.ip;
  const now = Date.now();
  const entry = hits.get(key) || { count: 0, ts: now };
  if (now - entry.ts > WINDOW_MS) { entry.count = 0; entry.ts = now; }
  entry.count += 1;
  hits.set(key, entry);
  if (entry.count > MAX) return res.status(429).json({ error: 'Too many requests' });
  next();
};
