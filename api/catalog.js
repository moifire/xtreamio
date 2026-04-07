const { sendJson, handleOptions, readCatalog, makeMeta } = require('./lib/utils');

module.exports = async (req, res) => {
  if (handleOptions(req, res)) return;

  const url = new URL(req.url, 'http://localhost');
  const type = url.searchParams.get('type');
  const db = readCatalog();

  const metas = db.items
    .filter(item => !type || item.type === type)
    .map(item => makeMeta(item));

  return sendJson(res, 200, { metas });
};
