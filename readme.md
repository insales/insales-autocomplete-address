# InSales - autocomplete address

[![npm version](https://img.shields.io/npm/v/insales-autocomplete-address.svg)](https://www.npmjs.com/package/insales-autocomplete-address)
[![npm](https://img.shields.io/npm/dm/insales-autocomplete-address.svg)](https://www.npmjs.com/package/insales-autocomplete-address)

## Installation

```bash
npm install insales-autocomplete-address
```

Пакет на npm: [insales-autocomplete-address](https://www.npmjs.com/package/insales-autocomplete-address)

## Usage

```html
<div class="insales-autocomplete-address">
  <input
    type="text"
    class="insales-autocomplete-address-input"
    placeholder="Введите адрес"
    value=""
  >
  <ul class="insales-autocomplete-address-result-list"></ul>
</div>


<script type="text/javascript">
  const autocomplete = new InsalesAutocompleteAddress('.insales-autocomplete-address', {
    autoLocation: true,
    debounceTime: 0,
    country: 'RU',
    clearInputOnCountryChange: false,
    onChange: (data)=>{
      console.log('onChange', data);
    }
  });
</script>
```

## Options

- `autoLocation` (default: `true`): Определять адрес автоматически?

- `debounceTime` (default: `0`): Задержка между запросами в КЛАДР (в миллисекундах)

- `country` (default: `'RU'`): Код страны для поиска адресов (например, 'RU', 'US', 'DE', 'FR', 'GB', 'KZ', 'BY')

- `initialFulltextSearch` (default: `null`): Начальный поисковый запрос для автоматического заполнения при инициализации

- `clearInputOnCountryChange` (default: `false`): Очищать поле ввода при переключении страны. Если `true`, при вызове `setCountry()` или `recreate()` инпут будет очищен, и локация из localStorage не будет установлена.

- `onChange` (default: `function`): Callback после выбора адреса. Принимает объект с данными о локации.

## Methods

### `setCountry(country)`

Устанавливает страну для поиска адресов.

```javascript
autocomplete.setCountry('US');
```

**Параметры:**
- `country` (string): Код страны (например, 'RU', 'US', 'DE')

**Примечание:** Если `clearInputOnCountryChange` установлен в `true`, инпут будет автоматически очищен при изменении страны.

### `setValue(data)`

Устанавливает значение в поле ввода автокомплита.

```javascript
autocomplete.setValue({
  result: 'г Москва, ул Ленина, д 1'
});
```

**Параметры:**
- `data` (Object): Объект с данными о локации
  - `data.result` (string): Текст для установки в поле ввода

### `clearInput()`

Очищает поле ввода автокомплита.

```javascript
autocomplete.clearInput();
```

### `recreate(options)`

Пересоздает все экземпляры автокомплита. Полезно для обновления конфигурации или восстановления после `destroy()`.

```javascript
// Пересоздать без установки локации
autocomplete.recreate({ withLocation: false });

// Пересоздать с установкой локации
autocomplete.recreate({ withLocation: true });
```

**Параметры:**
- `options` (Object, опционально):
  - `withLocation` (boolean, default: `false`): Устанавливать ли адрес при пересоздании

**Примечание:** Если `clearInputOnCountryChange` установлен в `true` и `withLocation` равен `false`, инпут будет очищен перед инициализацией.

### `initWithoutLocation()`

Инициализирует автокомплиты без установки локации из localStorage.

```javascript
autocomplete.initWithoutLocation();
```

### `destroy()`

Уничтожает все экземпляры автокомплита. Удаляет обработчики событий и очищает ссылки.

```javascript
autocomplete.destroy();
```

## Примеры

### Переключение страны с очисткой инпута

```javascript
const autocomplete = new InsalesAutocompleteAddress('.insales-autocomplete-address', {
  country: 'RU',
  clearInputOnCountryChange: true
});

// При переключении страны инпут будет очищен
autocomplete.setCountry('US');
autocomplete.recreate({ withLocation: false });
```

### Переключение страны без очистки инпута (по умолчанию)

```javascript
const autocomplete = new InsalesAutocompleteAddress('.insales-autocomplete-address', {
  country: 'RU',
  clearInputOnCountryChange: false // или просто не указывать
});

// При переключении страны дефолтный город останется
autocomplete.setCountry('US');
autocomplete.recreate({ withLocation: false });
```

### Управление жизненным циклом

```javascript
const autocomplete = new InsalesAutocompleteAddress('.insales-autocomplete-address');

// Уничтожить автокомплит
autocomplete.destroy();

// Пересоздать автокомплит
autocomplete.recreate({ withLocation: false });
```
