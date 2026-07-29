/* Runner de autoteste do MX RESCISÃO fora do navegador.
   Uso:  node testar.js
   Extrai o <script> do index.html e roda com um DOM mínimo simulado. */
var fs = require('fs'), path = require('path');

var html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
/* o index.html tem dois blocos: o extrator de PDF e o app */
var blocos = [], re = /<script>([\s\S]*?)<\/script>/g, x;
while ((x = re.exec(html))) blocos.push(x[1]);
if (!blocos.length) { console.error('script não encontrado no index.html'); process.exit(2); }

/* DOM mínimo: só o suficiente para o boot não quebrar */
function fakeEl() {
  var e = {
    className: '', innerHTML: '', textContent: '', value: '', hidden: false,
    style: { cssText: '' }, onclick: null,
    nextSibling: null, nextElementSibling: null,
    classList: { add: function () {}, remove: function () {}, toggle: function () {}, contains: function () { return false; } },
    querySelector: function () { return fakeEl(); },
    querySelectorAll: function () { return []; },
    firstChild: null, parentNode: null,
    appendChild: function () {}, insertBefore: function () {},
    removeChild: function () {}, focus: function () {},
    getAttribute: function () { return null; }, setAttribute: function () {},
    addEventListener: function () {}
  };
  return e;
}
global.document = {
  readyState: 'complete',
  documentElement: fakeEl(),
  querySelector: function () { return fakeEl(); },
  querySelectorAll: function () { return []; },
  createElement: function () { return fakeEl(); },
  addEventListener: function () {},
  body: { appendChild: function () {}, style: {} }
};
global.window = {
  console: console,
  matchMedia: function () { return { matches: false }; },
  scrollTo: function () {}
};
global.location = { search: '' };
global.localStorage = {
  _d: {},
  getItem: function (k) { return this._d[k] || null; },
  setItem: function (k, v) { this._d[k] = v; },
  removeItem: function (k) { delete this._d[k]; }
};
blocos.forEach(function (b) { eval(b); });

/* dentro do eval, `module` é o deste arquivo (wrapper CommonJS) */
var api = module.exports && module.exports.autoteste ? module.exports : global.window.MXRESC;
if (!api || !api.autoteste) { console.error('autoteste não exportado'); process.exit(2); }

var r = api.autoteste();
console.log(r.logs.join('\n'));
console.log('\n' + r.resumo);
process.exit(r.falhas ? 1 : 0);
