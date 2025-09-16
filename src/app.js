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
    this.originalSelector = selector;
    this.items = document.querySelectorAll(selector);
    this.storageKey = 'InsalesAutocompleteAddress';
    this.currentLocation = '';
    this.searchQuery = '';
    this.AutocompleteInstance = null;
    this.boundHandleLocationUpdate = this.handleLocationUpdate.bind(this);

    if (!this.items.length) {
      console.warn(`Передан неверный селектор: ${selector}`);
      return;
    }

    this.init();
  }

  /**
   * Инициализирует автокомплиты и обработчики событий
   */
  init() {
    locationUtil.getLocation(this.storageKey, this.options).then((data) => {
      this.items.forEach(el => {
        this.createAutocomplete(el);
        if (data) {
          locationUtil.setLocation(this.storageKey, data);
        }
      });
    });

    document.addEventListener('update:location:insales:autocomplete:address', this.boundHandleLocationUpdate);
  }

  /**
   * Инициализирует автокомплиты без установки локации
   */
  initWithoutLocation() {
    this.items.forEach(el => {
      this.createAutocomplete(el);
    });

    document.addEventListener('update:location:insales:autocomplete:address', this.boundHandleLocationUpdate);
  }

  /**
   * Устанавливает значение в поля ввода автокомплита
   * @param {Object} data - Объект с данными о локации
   * @param {string} data.result - Результат поиска для установки в поле ввода
   */
  setValue(data) {
    this.items.forEach(el => {
      const $input = el.querySelector('.insales-autocomplete-address-input');
      if (data.result && $input && $input.value !== data.result) {
        $input.value = data.result;
        $input.setAttribute('value', data.result);
      }
    });
  }

  /**
   * Устанавливает страну для поиска адресов
   * @param {string} country - Код страны (например, 'RU', 'US', 'DE')
   */
  setCountry(country) {
    this.options.country = country;
  }

  /**
   * Создает экземпляр автокомплита для указанного элемента
   * @param {HTMLElement} selector - DOM элемент контейнера автокомплита
   */
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

  /**
   * Обрабатывает поисковый запрос пользователя
   * @param {string} input - Поисковый запрос пользователя
   * @returns {Promise<Array>} Промис, который разрешается массивом результатов поиска
   */
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

  /**
   * Извлекает значение для отображения из результата поиска
   * @param {Object} result - Результат поиска
   * @param {boolean} result.isError - Флаг ошибки
   * @param {string} result.result - Текст результата
   * @returns {string} Значение для отображения в поле ввода
   */
  getResultValue(result) {
    return (!result.isError) ? result.result : this.currentLocation;
  }

  /**
   * Рендерит HTML для элемента результата поиска
   * @param {Object} result - Результат поиска
   * @param {string} result.result - Текст результата
   * @param {string} props - HTML атрибуты для элемента списка
   * @returns {string} HTML строка для элемента результата
   */
  renderResult(result, props) {
    return `
      <li ${props}>
        <div class="insales-autocomplete-address-title">
          ${highlightResult(result.result, this.searchQuery)}
        </div>
      </li>
    `;
  }

  /**
   * Обрабатывает выбор результата пользователем
   * @param {Object} result - Выбранный результат
   * @param {boolean} result.isError - Флаг ошибки
   * @param {string} result.result - Текст результата
   */
  handleSubmit(result) {
    if (result && !result.isError) {
      locationUtil.setLocation(this.storageKey, result, this.$input);
    }
  }

  /**
   * Обработчик события обновления локации
   * @param {Event} event - Событие с данными о локации
   */
  handleLocationUpdate(event) {
    this.setValue(event.detail.data);
    this.options.onChange(event.detail.data);
    this.currentLocation = event.detail.data.result;
  }

  /**
   * Уничтожает все экземпляры автокомплита
   * Удаляет обработчики событий и очищает ссылки
   */
  destroy() {
    if (this.AutocompleteInstance && typeof this.AutocompleteInstance.destroy === 'function') {
      this.AutocompleteInstance.destroy();
    }
    
    document.removeEventListener('update:location:insales:autocomplete:address', this.boundHandleLocationUpdate);
    
    this.AutocompleteInstance = null;
    this.items = null;
    this.currentLocation = '';
    this.searchQuery = '';
  }

  /**
   * Пересоздает все экземпляры автокомплита
   * Полезно для обновления конфигурации или восстановления после destroy
   * @param {Object} options - Настройки пересоздания
   * @param {boolean} options.withLocation - Устанавливать ли адрес при пересоздании (по умолчанию false)
   */
  recreate({ withLocation = false } = {}) {
    this.destroy();
    
    this.items = document.querySelectorAll(this.originalSelector);
    
    if (!this.items.length) {
      console.warn(`Не найдены элементы по селектору: ${this.originalSelector}`);
      return;
    }
    
    this.boundHandleLocationUpdate = this.handleLocationUpdate.bind(this);
    
    if (withLocation) {
      this.init();
    } else {
      this.initWithoutLocation();
    }
  }
}

export default InsalesAutocompleteAddress;
