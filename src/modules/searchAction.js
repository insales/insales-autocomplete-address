import fetchJSONP from './fetchJSONP.js';

export default (input, country) => {
  const kladrUrl = 'https://kladr.insales.ru'
  const url = `${kladrUrl}/fulltext_search.json?q=${input}&country=${country}&with_parent=1`

  return new Promise((resolve, reject) => {
    if (input.length < 2) {
      return resolve([])
    }

    fetchJSONP(url, {
      mode: "no-cors",
      method: "GET"
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        reject(data.error);
      }else{
        resolve(data);
      }
    })
    .catch((err) => {
      console.warn(err);
      reject(err);
    })
  })
}
