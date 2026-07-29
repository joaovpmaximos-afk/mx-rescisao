/* Confere o extrator de PDF contra arquivos reais, fora do navegador.
   Uso:  node validar-pdf.js [pasta]     (padrão: ./pdfs)

   Os PDFs de rescisão têm dado pessoal e NÃO entram no repositório — o
   .gitignore bloqueia *.pdf e a pasta pdfs/. Jogue os arquivos numa pasta
   local e rode; nada é enviado a lugar nenhum.

   Para cada PDF encontrado, mostra o texto extraído, o que o parser
   entendeu e quantos erros a auditoria apontou. */
var fs = require('fs'), path = require('path');

/* ---- carrega os dois blocos de script do index.html com um DOM mínimo ---- */
function fakeEl() {
  return { className:'', innerHTML:'', textContent:'', value:'', hidden:false, style:{cssText:''},
    onclick:null, nextSibling:null, nextElementSibling:null,
    classList:{add:function(){},remove:function(){},toggle:function(){},contains:function(){return false;}},
    querySelector:function(){return fakeEl();}, querySelectorAll:function(){return [];},
    firstChild:null, parentNode:null, appendChild:function(){}, insertBefore:function(){},
    removeChild:function(){}, focus:function(){}, getAttribute:function(){return null;},
    setAttribute:function(){}, addEventListener:function(){} };
}
global.document = { readyState:'complete', documentElement:fakeEl(),
  querySelector:function(){return fakeEl();}, querySelectorAll:function(){return [];},
  createElement:function(){return fakeEl();}, addEventListener:function(){},
  body:{appendChild:function(){}, style:{}} };
global.window = { console:console, matchMedia:function(){return {matches:false};}, scrollTo:function(){} };
global.location = { search:'' };
global.localStorage = { _d:{}, getItem:function(k){return this._d[k]||null;}, setItem:function(k,v){this._d[k]=v;} };

var html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
var re = /<script>([\s\S]*?)<\/script>/g, x;
while ((x = re.exec(html))) eval(x[1]);
var APP = module.exports, PDF = global.window.MXPDF;

/* ------------------------------- execução ------------------------------- */
var pasta = process.argv[2] || path.join(__dirname, 'pdfs');
if (!fs.existsSync(pasta)) {
  console.error('pasta não encontrada: ' + pasta);
  console.error('crie a pasta "pdfs" ao lado deste arquivo e coloque os PDFs, ou passe o caminho.');
  process.exit(2);
}
function achar(dir, out) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(function (e) {
    var p = path.join(dir, e.name);
    if (e.isDirectory()) achar(p, out); else if (/\.pdf$/i.test(e.name)) out.push(p);
  });
  return out;
}
var arquivos = achar(pasta, []);
if (!arquivos.length) { console.error('nenhum PDF em ' + pasta); process.exit(2); }

function fd(d) {
  if (!d) return '—';
  function p(n) { return (n < 10 ? '0' : '') + n; }
  return p(d.getUTCDate()) + '/' + p(d.getUTCMonth() + 1) + '/' + d.getUTCFullYear();
}

(async function () {
  var falhas = 0;
  for (var i = 0; i < arquivos.length; i++) {
    var p = arquivos[i];
    console.log('\n===== ' + path.relative(pasta, p) + ' =====');
    var buf = fs.readFileSync(p);
    var ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    var txt;
    try { txt = await PDF.lerPdf(ab); }
    catch (e) { console.log('  não extraiu: ' + e.message); falhas++; continue; }

    var linhas = txt.split('\n');
    console.log('  extraído: ' + linhas.length + ' linhas, ' + txt.length + ' caracteres');
    if (process.env.TEXTO) console.log(txt);

    var d = APP.parseAnalitico(txt);
    if (!d.rubricas.length) { console.log('  não é um relatório analítico (nenhuma rubrica).'); continue; }

    var sp = 0, sd = 0;
    d.rubricas.forEach(function (r) { if (r.tipo === 'P') sp += r.valor; else sd += r.valor; });
    sp = Math.round(sp * 100) / 100; sd = Math.round(sd * 100) / 100;

    console.log('  empregado: ' + d.nome + ' | salário ' + d.salario + ' | ' + d.motivo);
    console.log('  datas: adm ' + fd(d.admissao) + ' · aviso ' + fd(d.dataAviso) +
                ' · saída ' + fd(d.demissao) + ' · projeção ' + fd(d.projecao) + ' · pgto ' + fd(d.pagamento));
    console.log('  rubricas: ' + d.rubricas.length + ' | períodos de férias: ' + d.ferias.length);
    console.log('  proventos: ' + sp + ' (declarado ' + d.totalP + ')' +
                (d.totalP != null && Math.abs(sp - d.totalP) > 0.05 ? '  << NÃO BATE' : ''));
    console.log('  descontos: ' + sd + ' (declarado ' + d.totalD + ')' +
                (d.totalD != null && Math.abs(sd - d.totalD) > 0.05 ? '  << NÃO BATE' : ''));
    if (d.totalP != null && Math.abs(sp - d.totalP) > 0.05) falhas++;
    if (d.totalD != null && Math.abs(sd - d.totalD) > 0.05) falhas++;

    var F = APP.auditar(d).findings;
    var erros = F.filter(function (f) { return f.sev === 'erro'; });
    console.log('  auditoria: ' + erros.length + ' erro(s), ' +
                F.filter(function (f) { return f.sev === 'alerta'; }).length + ' alerta(s)');
    erros.forEach(function (f) { console.log('    - ' + f.titulo); });
  }
  console.log('\n' + (falhas ? falhas + ' problema(s) de leitura' : 'leitura consistente em todos os arquivos'));
  process.exit(falhas ? 1 : 0);
})();
