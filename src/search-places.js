const parseArrayOptions = require('./utils/parse-array-options');

function getPlaces(fetcher, q, options = {}) {
  const path = '/places';
  const query = {
    ...parseArrayOptions(options),
    q: q || ''
  };

  return fetcher.get({
    path,
    query
  });
}

module.exports = getPlaces;
