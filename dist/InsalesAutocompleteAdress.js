/*!
 * InsalesAutocompleteAdress v0.1.6
 * https://github.com/insales/insales-autocomplete-adress/
 */
var InsalesAutocompleteAdress=function(e){var t={};function n(s){if(t[s])return t[s].exports;var o=t[s]={i:s,l:!1,exports:{}};return e[s].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(s,o,function(t){return e[t]}.bind(null,o));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){const s=n(2).default;n(1),e.exports=s},function(e,t,n){},function(e,t,n){"use strict";function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.r(t);var r,a=function(e,t){return e.matches?e.matches(t):e.msMatchesSelector?e.msMatchesSelector(t):e.webkitMatchesSelector?e.webkitMatchesSelector(t):null},l=function(e,t){return e.closest?e.closest(t):function(e,t){for(var n=e;n&&1===n.nodeType;){if(a(n,t))return n;n=n.parentNode}return null}(e,t)},u=function(e){return Boolean(e&&"function"==typeof e.then)},c=function e(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=n.search,r=n.autoSelect,a=void 0!==r&&r,c=n.setValue,d=void 0===c?function(){}:c,h=n.setAttribute,p=void 0===h?function(){}:h,f=n.onUpdate,b=void 0===f?function(){}:f,v=n.onSubmit,m=void 0===v?function(){}:v,g=n.onShow,y=void 0===g?function(){}:g,w=n.onHide,S=void 0===w?function(){}:w,L=n.onLoading,x=void 0===L?function(){}:L,R=n.onLoaded,A=void 0===R?function(){}:R;s(this,e),i(this,"value",""),i(this,"searchCounter",0),i(this,"results",[]),i(this,"selectedIndex",-1),i(this,"handleInput",(function(e){var n=e.target.value;t.updateResults(n),t.value=n})),i(this,"handleKeyDown",(function(e){var n=e.key;switch(n){case"Up":case"Down":case"ArrowUp":case"ArrowDown":var s="ArrowUp"===n||"Up"===n?t.selectedIndex-1:t.selectedIndex+1;e.preventDefault(),t.handleArrows(s);break;case"Tab":t.selectResult();break;case"Enter":var o=t.results[t.selectedIndex];t.selectResult(),t.onSubmit(o);break;case"Esc":case"Escape":t.hideResults(),t.setValue();break;default:return}})),i(this,"handleFocus",(function(e){var n=e.target.value;t.updateResults(n),t.value=n})),i(this,"handleBlur",(function(){t.hideResults()})),i(this,"handleResultMouseDown",(function(e){e.preventDefault()})),i(this,"handleResultClick",(function(e){var n=e.target,s=l(n,"[data-result-index]");if(s){t.selectedIndex=parseInt(s.dataset.resultIndex,10);var o=t.results[t.selectedIndex];t.selectResult(),t.onSubmit(o)}})),i(this,"handleArrows",(function(e){var n=t.results.length;t.selectedIndex=(e%n+n)%n,t.onUpdate(t.results,t.selectedIndex)})),i(this,"selectResult",(function(){var e=t.results[t.selectedIndex];e&&t.setValue(e),t.hideResults()})),i(this,"updateResults",(function(e){var n=++t.searchCounter;t.onLoading(),t.search(e).then((function(e){n===t.searchCounter&&(t.results=e,t.onLoaded(),0!==t.results.length?(t.selectedIndex=t.autoSelect?0:-1,t.onUpdate(t.results,t.selectedIndex),t.showResults()):t.hideResults())}))})),i(this,"showResults",(function(){t.setAttribute("aria-expanded",!0),t.onShow()})),i(this,"hideResults",(function(){t.selectedIndex=-1,t.results=[],t.setAttribute("aria-expanded",!1),t.setAttribute("aria-activedescendant",""),t.onUpdate(t.results,t.selectedIndex),t.onHide()})),i(this,"checkSelectedResultVisible",(function(e){var n=e.querySelector('[data-result-index="'.concat(t.selectedIndex,'"]'));if(n){var s=e.getBoundingClientRect(),o=n.getBoundingClientRect();o.top<s.top?e.scrollTop-=s.top-o.top:o.bottom>s.bottom&&(e.scrollTop+=o.bottom-s.bottom)}})),this.search=u(o)?o:function(e){return Promise.resolve(o(e))},this.autoSelect=a,this.setValue=d,this.setAttribute=p,this.onUpdate=b,this.onSubmit=m,this.onShow=y,this.onHide=S,this.onLoading=x,this.onLoaded=A},d=0,h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return"".concat(e).concat(++d)},p=function(e,t){var n=e.getBoundingClientRect(),s=t.getBoundingClientRect();return n.bottom+s.height>window.innerHeight&&window.innerHeight-n.bottom<n.top&&window.pageYOffset+n.top-s.height>0?"above":"below"},f=function(e,t,n){var s;return function(){var o=this,i=arguments,r=function(){s=null,n||e.apply(o,i)},a=n&&!s;clearTimeout(s),s=setTimeout(r,t),a&&e.apply(o,i)}},b=function(){function e(t,n,o){s(this,e),this.id="".concat(o,"-result-").concat(t),this.class="".concat(o,"-result"),this["data-result-index"]=t,this.role="option",t===n&&(this["aria-selected"]="true")}var t,n,i;return t=e,(n=[{key:"toString",value:function(){var e=this;return Object.keys(this).reduce((function(t,n){return"".concat(t," ").concat(n,'="').concat(e[n],'"')}),"")}}])&&o(t.prototype,n),i&&o(t,i),e}(),v=function e(t){var n=this,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=o.search,a=o.onSubmit,l=void 0===a?function(){}:a,u=o.baseClass,d=void 0===u?"autocomplete":u,v=o.autoSelect,m=o.getResultValue,g=void 0===m?function(e){return e}:m,y=o.renderResult,w=o.debounceTime,S=void 0===w?0:w;s(this,e),i(this,"expanded",!1),i(this,"loading",!1),i(this,"position",{}),i(this,"resetPosition",!0),i(this,"initialize",(function(){n.root.style.position="relative",n.input.setAttribute("role","combobox"),n.input.setAttribute("autocomplete","off"),n.input.setAttribute("autocapitalize","off"),n.input.setAttribute("autocorrect","off"),n.input.setAttribute("spellcheck","false"),n.input.setAttribute("aria-autocomplete","list"),n.input.setAttribute("aria-haspopup","listbox"),n.input.setAttribute("aria-expanded","false"),n.resultList.setAttribute("role","listbox"),n.resultList.style.position="absolute",n.resultList.style.zIndex="1",n.resultList.style.width="100%",n.resultList.style.boxSizing="border-box",n.resultList.id||(n.resultList.id=h("".concat(n.baseClass,"-result-list-"))),n.input.setAttribute("aria-owns",n.resultList.id),document.body.addEventListener("click",n.handleDocumentClick),n.input.addEventListener("input",n.core.handleInput),n.input.addEventListener("keydown",n.core.handleKeyDown),n.input.addEventListener("focus",n.core.handleFocus),n.input.addEventListener("blur",n.core.handleBlur),n.resultList.addEventListener("mousedown",n.core.handleResultMouseDown),n.resultList.addEventListener("click",n.core.handleResultClick),n.updateStyle()})),i(this,"setAttribute",(function(e,t){n.input.setAttribute(e,t)})),i(this,"setValue",(function(e){n.input.value=e?n.getResultValue(e):""})),i(this,"renderResult",(function(e,t){return"<li ".concat(t,">").concat(n.getResultValue(e),"</li>")})),i(this,"handleUpdate",(function(e,t){n.resultList.innerHTML="",e.forEach((function(e,s){var o=new b(s,t,n.baseClass),i=n.renderResult(e,o);"string"==typeof i?n.resultList.insertAdjacentHTML("beforeend",i):n.resultList.insertAdjacentElement("beforeend",i)})),n.input.setAttribute("aria-activedescendant",t>-1?"".concat(n.baseClass,"-result-").concat(t):""),n.resetPosition&&(n.resetPosition=!1,n.position=p(n.input,n.resultList),n.updateStyle()),n.core.checkSelectedResultVisible(n.resultList)})),i(this,"handleShow",(function(){n.expanded=!0,n.updateStyle()})),i(this,"handleHide",(function(){n.expanded=!1,n.resetPosition=!0,n.updateStyle()})),i(this,"handleLoading",(function(){n.loading=!0,n.updateStyle()})),i(this,"handleLoaded",(function(){n.loading=!1,n.updateStyle()})),i(this,"handleDocumentClick",(function(e){n.root.contains(e.target)||n.core.hideResults()})),i(this,"updateStyle",(function(){n.root.dataset.expanded=n.expanded,n.root.dataset.loading=n.loading,n.root.dataset.position=n.position,n.resultList.style.visibility=n.expanded?"visible":"hidden",n.resultList.style.pointerEvents=n.expanded?"auto":"none","below"===n.position?(n.resultList.style.bottom=null,n.resultList.style.top="100%"):(n.resultList.style.top=null,n.resultList.style.bottom="100%")})),this.root="string"==typeof t?document.querySelector(t):t,this.input=this.root.querySelector("input"),this.resultList=this.root.querySelector("ul"),this.baseClass=d,this.getResultValue=g,"function"==typeof y&&(this.renderResult=y);var L=new c({search:r,autoSelect:v,setValue:this.setValue,setAttribute:this.setAttribute,onUpdate:this.handleUpdate,onSubmit:l,onShow:this.handleShow,onHide:this.handleHide,onLoading:this.handleLoading,onLoaded:this.handleLoaded});S>0&&(L.handleInput=f(L.handleInput,S)),this.core=L,this.initialize()},m=(r=0,e=>new Promise(t=>{let n=document.createElement("script"),s="_jsonp_"+r++;e.match(/\?/)?e+="&callback="+s:e+="?callback="+s,n.src=e,window[s]=e=>{t(new Response(JSON.stringify(e))),n.remove(),delete window[s]},document.body.appendChild(n)})),g=e=>{const t=`https://kladr.insales.ru/fulltext_search.json?q=${e}&with_parent=1`;return new Promise(n=>{if(e.length<2)return n([]);m(t,{mode:"no-cors",method:"GET"}).then(e=>e.json()).then(e=>{n(e)}).catch(e=>{console.warn(e),reject(e)})})};let y=(e,t)=>{var n=new CustomEvent(e,{detail:{data:t}});document.dispatchEvent(n)},w=()=>new Promise((e,t)=>{m("https://kladr.insales.ru/locate.json",{mode:"no-cors",method:"GET"}).then(e=>e.json()).then(t=>{e(t)}).catch(e=>{console.warn(e),t(e)})});var S=(e,t)=>new Promise((n,s)=>{if(!localStorage&&t||localStorage&&!localStorage[e]&&t)w().then(e=>{n(e)}).catch(e=>{n(null)});else try{let t=JSON.parse(localStorage[e]);n(t)}catch(e){n(null)}}),L=(e,t,n)=>(y("update:lacation:insales:autocomplete:adress",t),new Promise((n,s)=>{if(localStorage)try{localStorage[e]=JSON.stringify(t),n()}catch(e){s(e)}else n()}));t.default=class{constructor(e,{onChange:t=(()=>{}),autoLocation:n=!0,debounceTime:s=0}){this.options={onChange:t,debounceTime:s,autoLocation:n},this.items=document.querySelectorAll(e),this.storageKey="InsalesAutocompleteAdress",this.currentLocation="",this.searchQuery="",this.AutocompleteInstance=null,this.items.length?(S(this.storageKey,this.options.autoLocation).then(e=>{this.items.forEach(t=>{this.createAutocomplete(t),e&&L(this.storageKey,e)})}),document.addEventListener("update:lacation:insales:autocomplete:adress",e=>{this.setValue(e.detail.data),this.options.onChange(e.detail.data),this.currentLocation=e.detail.data.result})):console.warn("Передан неверный селектор: "+e)}setValue(e){this.items.forEach(t=>{let n=t.querySelector(".insales-autocomplete-adress-input");e.result&&n&&n.value!==e.result&&(n.value=e.result)})}createAutocomplete(e){let t=this.options,n=e.querySelector(".insales-autocomplete-adress-input");e.classList.add("insales-autocomplete-adress"),this.AutocompleteInstance=new v(e,{search:e=>(this.searchQuery=e,new Promise((t,n)=>{g(e).then(n=>{0==n.length&&e.length>5?t([{isError:!0,result:"Город не найден"}]):t(n)}).catch(n=>{""!=e&&t([{isError:!0,result:"Город не найден"}])})})),baseClass:"insales-autocomplete-adress",autoSelect:!0,debounceTime:t.debounceTime,getResultValue:e=>e.isError?this.currentLocation:e.result,renderResult:(e,t)=>`\n          <li ${t}>\n            <div class="insales-autocomplete-adress-title">\n              ${((e,t)=>{let n=new RegExp(`(${t})`,"gi");return e.replace(n,"<strong>$1</strong>")})(e.result,this.searchQuery)}\n            </div>\n          </li>\n        `,onSubmit:e=>{e&&!e.isError&&L(this.storageKey,e,n)}})}}}]);