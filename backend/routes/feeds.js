const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const feedsDir = path.join(__dirname, '..', 'public', 'feeds');

// Ensure directory exists
if (!fs.existsSync(feedsDir)) {
  fs.mkdirSync(feedsDir, { recursive: true });
}

// GET /feeds/facebook-catalog.csv
router.get('/facebook-catalog.csv', (req, res) => {
  const filePath = path.join(feedsDir, 'facebook-catalog.csv');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    return res.sendFile(filePath);
  }
  res.status(404).send('Feed not found');
});

// GET /feeds/facebook-catalog-flat.csv
router.get('/facebook-catalog-flat.csv', (req, res) => {
  const filePath = path.join(feedsDir, 'facebook-catalog-flat.csv');
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    return res.sendFile(filePath);
  }
  res.status(404).send('Feed not found');
});

module.exports = router;
