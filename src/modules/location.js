import fetchJSONP from './fetchJSONP.js';

let getLocation = (key, autoLocation) => {
  return new Promise((resolve, reject) => {
    if (!localStorage && autoLocation || localStorage && !localStorage[key] && autoLocation) {
      getKladrLocation().then((data) => {
        resolve(data);
      })
      .catch((err) => {
        resolve(null);
      })
    }else{
      try {
        let data = JSON.parse(localStorage[key]);
        resolve(data);
      } catch (err) {
        resolve(null);
      }
    }
  })
}

let setLocation = (key, data, target) => {
  setEventUpdate('update:lacation:insales:autocomplete:adress', data)
  return new Promise((resolve, reject) => {
    if (!localStorage) {
      resolve();
    }else{
      try {
        localStorage[key] = JSON.stringify(data)
        resolve();
      } catch (err) {
        reject(err);
      }
    }
  })
}

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
