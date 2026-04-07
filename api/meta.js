const { sendJson, handleOptions, readCatalog, makeMeta } = require('./lib/utils');

module.exports = async (req, res) => {
  if (handleOptions(req, res)) return;

  const url = new URL(req.url, 'http://localhost');
  const type = url.searchParams.get('type');
  const id = url.searchParams.get('id');
  const db = readCatalog();

  const item = db.items.find(x => x.id === id && (!type || x.type === type));
  if (!item) return sendJson(res, 404, { error: 'Meta no encontrada' });

  return sendJson(res, 200, { meta: makeMeta(item) });
};
