const express = require('express');
const router = express.Router();

router.get('/healthz', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), ts: Date.now() });
});

module.exports = router;
