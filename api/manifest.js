const { sendJson, handleOptions, readCatalog } = require('./lib/utils');

module.exports = async (req, res) => {
  if (handleOptions(req, res)) return;

  const db = readCatalog();
  const manifest = {
    id: 'com.moitube.legal.pro.admin',
    version: '1.1.0',
    name: db.addonsBrand?.name || 'Legal PRO',
    description: db.addonsBrand?.description || 'Addon legal para contenido propio o licenciado',
    logo: db.addonsBrand?.logo || '',
    resources: ['catalog', 'meta', 'stream'],
    types: ['movie', 'series', 'tv'],
    catalogs: [
      { type: 'movie', id: 'legal-movies', name: 'Películas' },
      { type: 'series', id: 'legal-series', name: 'Series' },
      { type: 'tv', id: 'legal-tv', name: 'TV en directo' }
    ],
    behaviorHints: {
      configurable: false,
      configurationRequired: false
    }
  };

  return sendJson(res, 200, manifest);
};
