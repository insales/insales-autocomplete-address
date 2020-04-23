import Autocomplete from '@trevoreyre/autocomplete-js';
import searchAction from './modules/searchAction.js';
import locationUtil from './modules/location.js';
import highlightResult from './modules/highlightResult.js';


class InsalesAutocompleteAdress {
  constructor(selector, {
      onChange = () => {},
      autoLocation = true,
      debounceTime = 0
    }) {
    this.options = {onChange, debounceTime, autoLocation};
    this.items = document.querySelectorAll(selector);
    this.storageKey = 'InsalesAutocompleteAdress';
    this.currentLocation = '';
    this.searchQuery = '';
    this.AutocompleteInstance = null;

    if (!this.items.length) {
      console.warn(`Передан неверный селектор: ${selector}`);
      return;
    }

    locationUtil.getLocation(this.storageKey, this.options.autoLocation).then((data) => {
      this.items.forEach(el => {
        this.createAutocomplete(el)
        if (data) {
          locationUtil.setLocation(this.storageKey, data);
        }
      });
    })

    document.addEventListener('update:lacation:insales:autocomplete:adress', (event) => {
      this.setValue(event.detail.data);
      this.options.onChange(event.detail.data);
      this.currentLocation = event.detail.data.result;
    })
  }

  setValue(data) {
    this.items.forEach(el => {
      let $input = el.querySelector('.insales-autocomplete-adress-input');
      if (data.result && $input && $input.value !== data.result) {
        $input.value = data.result;
      }
    });
  }

  createAutocomplete(selector) {
      let options = this.options;
      let $input = selector.querySelector('.insales-autocomplete-adress-input');

      selector.classList.add('insales-autocomplete-adress');

      this.AutocompleteInstance = new Autocomplete(selector, {
        search: input => {
          this.searchQuery = input;
          return new Promise((resolve, reject) => {
            searchAction(input)
              .then((data) => {
                if (data.length == 0 && input.length > 5) {
                  resolve([
                    {
                      isError: true,
                      result: 'Город не найден'
                    }
                  ]);
                }else{
                  resolve(data);
                }
              })
              .catch((data) => {
                if (input != '') {
                  resolve([
                    {
                      isError: true,
                      result: 'Город не найден'
                    }
                  ]);
                }
              })
          })
        },

        baseClass: 'insales-autocomplete-adress',
        autoSelect: true,
        debounceTime: options.debounceTime,
        getResultValue: result => (!result.isError) ? result.result : this.currentLocation,
        renderResult: (result, props) => `
          <li ${props}>
            <div class="insales-autocomplete-adress-title">
              ${highlightResult(result.result, this.searchQuery)}
            </div>
          </li>
        `,
        onSubmit: result => {
          if (result && !result.isError) {
            locationUtil.setLocation(this.storageKey, result, $input);
          }
        }
      })
  }
}

export default InsalesAutocompleteAdress;
