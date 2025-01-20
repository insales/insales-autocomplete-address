import Autocomplete from '@trevoreyre/autocomplete-js';
import searchAction from './modules/searchAction.js';
import locationUtil from './modules/location.js';
import highlightResult from './modules/highlightResult.js';


class InsalesAutocompleteAddress {
  constructor(selector, {
      onChange = () => {},
      autoLocation = true,
      initialFulltextSearch = null,
      country = 'RU',
      debounceTime = 0
    }) {
    this.options = {onChange, debounceTime, autoLocation, country, initialFulltextSearch};
    this.items = document.querySelectorAll(selector);
    this.storageKey = 'InsalesAutocompleteAddress';
    this.currentLocation = '';
    this.searchQuery = '';
    this.AutocompleteInstance = null;

    if (!this.items.length) {
      console.warn(`Передан неверный селектор: ${selector}`);
      return;
    }

    locationUtil.getLocation(this.storageKey, this.options).then((data) => {
      this.items.forEach(el => {
        this.createAutocomplete(el)
        if (data) {
          locationUtil.setLocation(this.storageKey, data);
        }
      });
    })

    document.addEventListener('update:location:insales:autocomplete:address', (event) => {
      this.setValue(event.detail.data);
      this.options.onChange(event.detail.data);
      this.currentLocation = event.detail.data.result;
    })
  }

  setValue(data) {
    this.items.forEach(el => {
      const $input = el.querySelector('.insales-autocomplete-address-input');
      if (data.result && $input && $input.value !== data.result) {
        $input.value = data.result;
        $input.setAttribute('value', data.result);
      }
    });
  }

  setCountry(country) {
    this.options.country = country;
  }

  createAutocomplete(selector) {
    const options = this.options;
    const $input = selector.querySelector('.insales-autocomplete-address-input');

    if ($input) {
      $input.onkeydown = (evt) => {
        if (evt.key === 'Enter') {
          evt.preventDefault();
          evt.stopPropagation();
          return false;
        }
      };
    }

    selector.classList.add('insales-autocomplete-address');

    this.AutocompleteInstance = new Autocomplete(selector, {
      search: this.handleSearch.bind(this),
      baseClass: 'insales-autocomplete-address',
      autoSelect: true,
      debounceTime: options.debounceTime,
      getResultValue: this.getResultValue.bind(this),
      renderResult: this.renderResult.bind(this),
      onSubmit: this.handleSubmit.bind(this)
    });
  }

  handleSearch(input) {
    this.searchQuery = input;
    return new Promise((resolve) => {
      searchAction(input, this.options.country)
        .then((data) => {
          if (data.length === 0 && input.length > 5) {
            resolve([{ isError: true, result: 'Город не найден' }]);
          } else {
            resolve(data);
          }
        })
        .catch(() => {
          if (input !== '') {
            resolve([{ isError: true, result: 'Город не найден' }]);
          }
        });
    });
  }

  getResultValue(result) {
    return (!result.isError) ? result.result : this.currentLocation;
  }

  renderResult(result, props) {
    return `
      <li ${props}>
        <div class="insales-autocomplete-address-title">
          ${highlightResult(result.result, this.searchQuery)}
        </div>
      </li>
    `;
  }

  handleSubmit(result) {
    if (result && !result.isError) {
      locationUtil.setLocation(this.storageKey, result, this.$input);
    }
  }
}

export default InsalesAutocompleteAddress;
