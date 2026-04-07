const { sendJson, handleOptions, readCatalog } = require('./lib/utils');

module.exports = async (req, res) => {
  if (handleOptions(req, res)) return;

  const url = new URL(req.url, 'http://localhost');
  const type = url.searchParams.get('type');
  const id = url.searchParams.get('id');
  const db = readCatalog();

  let streams = [];

  if (type === 'series' && id && id.includes(':')) {
    const [seriesId] = id.split(':');
    const item = db.items.find(x => x.id === seriesId && x.type === 'series');
    const episode = item?.videos?.find(v => v.id === id);
    streams = episode?.streams || [];
  } else {
    const item = db.items.find(x => x.id === id && (!type || x.type === type));
    streams = item?.streams || [];
  }

  return sendJson(res, 200, { streams });
};
