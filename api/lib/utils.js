const fs = require('fs');
const path = require('path');

function sendJson(res, statusCode, body) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.end(JSON.stringify(body));
}

function handleOptions(req, res) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.end();
    return true;
  }
  return false;
}

function readCatalog() {
  const file = path.join(process.cwd(), 'data', 'catalog.json');
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function makeMeta(item) {
  const meta = {
    id: item.id,
    type: item.type,
    name: item.name,
    description: item.description || '',
    poster: item.poster || '',
    background: item.background || '',
    genres: item.genres || [],
    year: item.year || undefined
  };

  if (item.type === 'series' && Array.isArray(item.videos)) {
    meta.videos = item.videos.map(v => ({
      id: v.id,
      title: v.title,
      season: v.season,
      episode: v.episode
    }));
  }

  return meta;
}

module.exports = { sendJson, handleOptions, readCatalog, makeMeta };
