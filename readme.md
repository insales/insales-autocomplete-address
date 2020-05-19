# InSales - autocomplete address

## Usage

```
<div class="insales-autocomplete-adress">
  <input
    type="text"
    class="insales-autocomplete-adress-input"
    placeholder="Введите адрес"
    value=""
  >
  <ul class="insales-autocomplete-adress-result-list"></ul>
</div>


<script type="text/javascript">
  new InsalesAutocompleteAdress('.insales-autocomplete-adress', {
    autoLocation: true,
    debounceTime: 0,
    onChange: (data)=>{
      console.log('onChange', data);
    }
  });
</script>
```

## Options

- `autoLocation` (default: true): Определять адрес автоматически?

- `debounceTime` (default: 0): Задержка между запросами в КЛАДР

- `onChange` (default: function): Callback после выбора адреса
