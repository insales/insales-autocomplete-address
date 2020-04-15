import fetchJSONP from './fetchJSONP.js';

export default input => {
  const kladrUrl = 'https://kladr.insales.ru'
  const url = `${kladrUrl}/fulltext_search.json?q=${input}&with_parent=1`

  return new Promise(resolve => {
    if (input.length < 2) {
      return resolve([])
    }

    fetchJSONP(url, {
      mode: "no-cors",
      method: "GET"
    })
    .then(response => response.json())
    .then(data => {
      resolve(data);
    })
    .catch((err) => {
      console.warn(err);
      reject(err);
    })
  })
}
