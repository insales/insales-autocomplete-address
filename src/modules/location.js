import fetchJSONP from './fetchJSONP.js';
import searchAction from './searchAction.js';

const getLocation = (key, { autoLocation, country, initialFulltextSearch }) => {
  return new Promise((resolve) => {
    if (!localStorage || (localStorage && !localStorage[key] && (autoLocation || initialFulltextSearch))) {
      if (initialFulltextSearch) {
        searchAction(initialFulltextSearch, country)
          .then((data) => {
            if (data.length === 0) {
              resolve(null)
            } else {
              resolve(data[0]);
            }
          })
          .catch(() => {
            if (input !== '') {
              resolve(null)
            }
          });
      } else {
        getKladrLocation()
          .then(resolve)
          .catch(() => resolve(null));
      }
    } else {
      try {
        const data = JSON.parse(localStorage[key]);
        resolve(data);
      } catch (err) {
        resolve(null);
      }
    }
  });
};

const setLocation = (key, data) => {
  setEventUpdate('update:location:insales:autocomplete:address', data);
  return new Promise((resolve, reject) => {
    if (!localStorage) {
      resolve();
    } else {
      try {
        localStorage[key] = JSON.stringify(data);
        resolve();
      } catch (err) {
        reject(err);
      }
    }
  });
};

let setEventUpdate = (name, data) => {
  var event = new CustomEvent(name, { 'detail': {data} });
  document.dispatchEvent(event);
}

let getKladrLocation = () => {
  return new Promise((resolve, reject) => {
    fetchJSONP('https://kladr.insales.ru/locate.json', {
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

export default {getLocation, setLocation}
