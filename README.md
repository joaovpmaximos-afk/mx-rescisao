# MX RESCISÃO

Conferidor automático de rescisão trabalhista. HTML único, offline, sem dependências.

## Como usar

1. Abra `index.html` no navegador.
2. Arraste **a pasta inteira do funcionário** para a tela — ou clique em **Abrir PDF…**.
   O app pontua cada arquivo e usa todos: o **relatório analítico** como base, o **TRCT**
   para a conferência cruzada e as **memórias de médias** para refazer cada média.
   No fim ele diz o que leu e o que ignorou.
3. Se preferir, ainda dá para colar o texto: `Ctrl+V` funciona em qualquer ponto da página.

A tela de resultado tem três partes:

- **Veredito** — o selo (conforme / N divergências), o impacto apurado em R$ e a barra de
  severidade com o total de verificações.
- **Linha do tempo do contrato** — admissão → aviso → afastamento → projeção do aviso →
  pagamento, em ordem cronológica, com o intervalo entre cada marco. Pagamento fora do prazo
  do art. 477 §6º fica vermelho; o trecho coberto pela projeção do aviso fica tracejado.
- **Duas colunas** — achados à esquerda, o cálculo lido à direita. **Clicar num achado
  destaca na tabela as rubricas que o originaram** (funciona com teclado: Tab + Enter/Espaço).

O filtro começa em *erros e alertas*; use *Tudo* para ver também o que foi conferido e está
correto. Os botões **Exemplo** carregam dois casos reais já conferidos.

Se o relatório não trouxer algum dado (motivo, tipo de aviso, data de pagamento), abra
**Ajustar premissas e recalcular** no card *Contrato*, à direita.

Tema claro e escuro pelo botão da barra superior (segue o sistema na primeira visita).
O botão de impressão gera um laudo em preto e branco com o veredito, a linha do tempo,
todos os achados e o cálculo.

## O que ele confere

**Datas e cadastro** — coerência das datas · dias de aviso proporcional (30 + 3 por ano
completo, teto 90, só a favor do empregado) · data de projeção do aviso indenizado ·
prazo de pagamento de 10 dias corridos e a multa do art. 477 §8º · empregado menor de 18 anos.

**Verbas × motivo** — matriz do que é devido em cada tipo de desligamento: 13º proporcional,
férias proporcionais, aviso, multa do FGTS, saque, seguro-desemprego. Aponta verba paga
indevidamente e verba devida que ficou de fora.

**Avos** — 13º e férias contados do zero (mês de 15 dias ou mais), incluindo a projeção do
aviso indenizado · o avo extra do aviso (Súmula 305 TST) quando ele foi esquecido ·
redução de férias por faltas (art. 130) · férias vencidas fora do período concessivo (dobro).

**Valores** — saldo de salário (detecta a divisão pelos dias do mês em vez de por 30) ·
base do 13º e das férias · terço constitucional sobre **todas** as parcelas de férias ·
aviso indenizado · aviso não cumprido descontado.

**Médias** — verifica se as médias de habituais (horas extras, DSR, adicionais, acúmulo de
função) foram integradas ao 13º, às férias e ao aviso.

**Encargos** — base do INSS (aviso indenizado, férias indenizadas, 1/3, VT e PAT fora dela) ·
INSS mensal e do 13º pela tabela progressiva · IRRF · FGTS de 8% sobre folha, 13º e aviso ·
multa de 40% sobre saldo + depósitos da rescisão.

**Descontos** — vale-transporte no teto de 6% · faltas em dias e em horas · reflexo no DSR ·
teto de compensação do art. 477 §5º.

**Fechamento** — soma de proventos, de descontos e o líquido.

## TRCT × analítico

O TRCT (Termo de Rescisão) é o documento que o empregado assina, e o sistema o gera por um
caminho diferente do relatório analítico. Quando alguém corrige o cálculo e regera só um dos
dois, a divergência não aparece para quem confere um só — e o termo é o que vale como quitação.

Solte os dois PDFs juntos. O app identifica qual é qual e cruza:

- **Identificação** — nome, CNPJ, admissão, aviso, afastamento e a causa do afastamento
  (campo 22). Documento de outra pessoa ou de outro evento vira erro na hora.
- **Totais** — bruto, deduções e líquido do termo contra a soma do analítico.
- **O termo contra ele mesmo** — a soma das caixas tem de bater com o total que ele declara.
  Se não bate, alguma caixa foi editada à mão depois de gerada.
- **Caixa a caixa** — campos 50, 63, 65, 66, 68, 69, 70, 71, 101, 106, 112.1, 112.2, 113 e 114
  contra o grupo de rubricas correspondente.
- **Outras verbas e outros descontos** (95.x e 115.x) não têm significado fixo, e no formulário
  a descrição quebra de linha. Em vez de adivinhar pelo texto, a reconciliação é por conjunto:
  cada caixa que sobrou tem de achar uma rubrica ainda não usada, com mesmo tipo e valor.
  Sobrou caixa sem rubrica, ou rubrica sem caixa, vira erro — é exatamente o caso da verba paga
  e não discriminada, que não gera quitação (art. 477, §2º).

Sem o TRCT o app avisa que essa camada ficou de fora, em vez de dar a rescisão por conferida.

## Memórias de médias

A memória imprime as próprias contas com os números dentro. O app **refaz cada uma** e ainda
cruza o resultado com o analítico. Solte os PDFs de "Cálculo de Médias" junto com o resto.

- **Aritmética impressa** — todas as fórmulas da memória são reavaliadas.
- **O quadro contra ele mesmo** — salário, média de horas, média de valor e vantagem têm de
  somar o total declarado.
- **Quadro × analítico** — o total e cada componente contra as rubricas correspondentes.
  Duas memórias de férias na mesma pasta são distinguidas pelo período aquisitivo:
  a que termina na data do afastamento é a proporcional, a outra é a vencida.
- **Divisor da média** — o número pelo qual a soma foi dividida contra a quantidade de meses
  do período declarado. Divisor errado muda a média e tudo que ela alimenta.
- **Jornada do valor-hora** — o divisor usado contra a jornada configurada.
- **Cobertura** — verba que integra média e ficou sem memória vira pendência.

Divergência na conta impressa sai como **atenção**, não como erro: se o resultado final ainda
bate com o analítico, o dinheiro está certo e quem errou foi a linha impressa. Nos documentos
reais de calibração isso apareceu de verdade — a memória imprime `16,621542 / 30 * 27,50 =
15,246414`, quando a conta dá `15,236414`, e só o valor correto faz a soma fechar nos 53,18
que o analítico lança. O valor pago está certo; o papel entregue ao empregado é que traz a
linha errada.

## Fatos do contrato

O relatório analítico traz números, não fatos. **A maior parte do que anula uma rescisão não
está nele**: gravidez, acidente de trabalho, mandato na CIPA ou no sindicato, contrato de
experiência, banco de horas, exame demissional. Sem isso a conferência tem um teto.

Por isso a coluna da direita tem o bloco **Fatos do contrato**, em quatro grupos. Cada resposta
liga verificações novas na hora — não há botão de confirmar.

| Grupo | Destrava |
|---|---|
| Garantias de emprego | Estabilidade da gestante, acidentária, CIPA, dirigente sindical, comissão de representantes, lei de cotas, contrato suspenso pelo INSS, pré-aposentadoria da convenção |
| Tipo de contrato | Indenização do art. 479, cláusula assecuratória, limite de 90 dias da experiência, aviso e multa indevidos no prazo determinado, intermitente, parcial, FGTS de aprendiz (2%) e de doméstico (8% + 3,2%) |
| Jornada e adicionais | Banco de horas na rescisão, insalubridade, periculosidade, adicional noturno, comissões e DSR, gorjetas, redução do aviso trabalhado |
| Procedimento e descontos | Exame demissional, baixa na CTPS e eSocial, guias do seguro-desemprego, dispensa coletiva, pensão alimentícia, dedução de dependentes |

**Não informado nunca vira erro.** As obrigações do empregador têm três estados — sim, não e
não informado. Só o "não" é afirmado como falha; o branco vira pendência, e enquanto o bloco
estiver intocado nem as pendências aparecem, só um aviso único de que ~30 verificações estão
desligadas. Um conferidor que grita erro sobre pergunta que ninguém fez deixa de ser confiável.

## Legislação & limites

O botão **Legislação** abre o índice do que a ferramenta sabe conferir — mais de 60 normas
entre Constituição, CLT, leis, decretos, súmulas do TST e precedentes do STF e do STJ — com a
situação de cada uma: *conferido*, *conferido pelos fatos do contrato* ou *não conferido*.

No fim do mesmo painel está a lista do **que ela não verifica**. Saber onde a ferramenta para
é o que evita a falsa sensação de que está tudo conferido.

## Convenções coletivas (CCT / ACT)

Botão **Convenções** na barra superior. Cada convenção é cadastrada uma vez e passa a ser
aplicada nas rescisões daquela categoria — o app lembra a última usada por CNPJ da empresa e
já sugere na próxima. Na virada da data-base, use **Duplicar** e troque vigência e valores.

Há **exportar / importar** em texto, para levar o cadastro a outra máquina ou compartilhar
com a equipe (é o mesmo JSON dos dois lados).

O que tem campo próprio é conferido automaticamente:

| Cláusula | O que o app faz |
|---|---|
| Piso salarial (geral e por função) | Acusa salário abaixo do piso e mostra o quanto toda a rescisão saiu a menor |
| Aviso prévio ampliado | Piso de dias, adicional por idade e por tempo de casa — sempre o que for melhor entre lei e convenção; nunca reduz, e não se aplica ao pedido de demissão |
| Vedação de descontar o aviso | Acusa o desconto do aviso não cumprido quando a convenção o proíbe |
| Prazo de pagamento menor que 10 dias | Encurta o limite do art. 477 §6º e reflete na linha do tempo |
| Multa própria por atraso | Em salários, em dias de salário por dia de atraso, ou valor fixo — cumulativa ou não com a do §8º |
| Indenização adicional da data-base | Lei 6.708/79 art. 9º, com a projeção do aviso (Súmulas 182 e 314 TST) |
| Homologação assistida | Avisa a partir do tempo de contrato que a convenção exigir |
| Contribuição assistencial | Desconto sem previsão, acima do teto, ou previsto e não descontado; lembra do direito de oposição (STF, Tema 935) |
| Adicionais mínimos | Compara o % da hora extra lançada com o garantido |
| Estabilidade pré-aposentadoria | Precisa da data prevista de aposentadoria; acusa dispensa dentro da janela |
| Teto de desconto de alimentação | Acusa desconto acima do percentual da convenção |

**Cláusulas livres** cobrem o resto: título, texto e tipo (*conferir no cálculo* → vira ponto
de atenção no laudo; *só informativo* → fica registrado). É o que evita fingir que o app
entende cláusula que ele não modela.

Sem convenção selecionada, a conferência roda só com a CLT e o laudo diz isso explicitamente.

## Tabelas

O painel **Tabelas & regras** (botão da barra superior) guarda INSS, IRRF e demais parâmetros
no navegador (localStorage), e traz a matriz do que é devido em cada motivo de desligamento.

A 1ª faixa do INSS (R$ 1.621,73 a 7,5%) foi **deduzida dos quatro lançamentos de INSS dos dois
casos reais** e bate com todos eles. As faixas seguintes e a tabela do IRRF são estimativas —
confira a legislação vigente antes de tratar uma divergência de INSS/IRRF como erro. Por isso
essas duas conferências saem como **atenção**, não como erro.

## Autoteste

- No navegador: `index.html?teste=1` — caixa de resultado no canto inferior direito.
- No terminal: `node testar.js`

390 verificações: utilitários, avos, art. 130, aviso proporcional, INSS, extrator de PDF
(dicionários aninhados, CMap, larguras de glifo, matriz de texto, montagem de linhas, escolha
do arquivo certo), parser dos dois
relatórios reais, leitura do TRCT e a conferência cruzada (identificação, totais, caixa a caixa
e reconciliação por conjunto, com dez cenários de divergência), leitura das memórias de médias
(avaliador de expressões, extração das contas, quadro de resultado, divisor, jornada e nove
cenários de divergência), auditoria completa dos dois
casos, o vínculo achado→rubrica que alimenta o
destaque cruzado, o veredito, as unidades dos achados, o módulo de convenções (vigência,
piso, aviso ampliado, data-base, multa, assistencial, homologação, estabilidade, cláusulas
livres), os fatos do contrato (as seis estabilidades, art. 479 e 481, limite da experiência,
FGTS por categoria, contribuição de 10% extinta, banco de horas, adicionais, redução do aviso,
procedimento em três estados) e 18 cenários sintéticos de erro (pagamento atrasado, projeção
errada, justa causa com verbas indevidas, avo do aviso esquecido, terço faltando, multa a
menor, aviso indenizado na base do INSS, médias ausentes, férias em dobro, VT acima de 6%,
compensação excessiva).

## Leitura do PDF

O extrator é próprio, sem biblioteca externa, para o app continuar sendo um arquivo só que
funciona offline. Cobre o que os sistemas de folha geram: PDF clássico, sem criptografia,
streams `FlateDecode` e fontes `Type0`/`CIDFontType2`.

Dois detalhes que quebram um extrator ingênuo, e que este trata:

- **Os bytes do texto não são letras.** Com `Identity-H`, cada par de bytes é um índice de
  glifo. Sem ler o `ToUnicode` do PDF e traduzir, o texto sai como sequência de símbolos.
- **Dicionários aninham.** O `/Resources` da página vem inline e contém um `/ColorSpace`
  antes do `/Font`; uma regex não-gulosa termina no `>>` errado e nunca acha as fontes.

A descompactação usa `DecompressionStream`, nativo do navegador. Em navegador antigo o app
avisa e oferece o caminho de colar o texto.

**O que não lê:** PDF protegido por senha e PDF digitalizado (imagem, sem camada de texto).
Nos dois casos a mensagem diz o motivo e oferece a alternativa — não falha em silêncio.

Para conferir o extrator contra PDFs reais sem publicá-los:

```bash
node validar-pdf.js ./pdfs
```

Coloque os arquivos numa pasta local (`pdfs/` e `*.pdf` estão no `.gitignore` — PDF de
rescisão tem dado pessoal de empregado e de cliente e não entra no repositório). O script
mostra o texto extraído, o que o parser entendeu e o que a auditoria apontou.

## Notas de implementação

**Unidades dos achados.** Cada achado tem `un`: `brl` (padrão), `dias`, `avos` ou `perc`.
Só os `brl` entram na soma do impacto — uma divergência de 10 dias de aviso não pode virar
R$ 10,00 no total. Ao criar um achado cujo par declarado × esperado não seja dinheiro, chame
`un('dias')` logo depois do `add`/`cmp`.

**Contraste.** As cores semânticas têm duas versões: a vívida (`--ok`, `--erro`, `--alerta`)
para fundos, bordas e marcadores, e a variante de texto (`--ok-tx`, `--erro-tx`, …) calibrada
por tema. Todas as combinações de texto medidas ficam acima de 4,5:1 nos dois temas.

**Troca de tema.** O motor do preview não revalida a propriedade `color` já computada quando
as custom properties mudam no `:root` — o fundo trocava e o texto ficava na cor do tema
anterior. Por isso o fundo e a cor de texto são declarados em cores literais numa regra que
casa com o `body`, e `forcarRecalculo()` destaca e reanexa o `body` na troca de tema. É
inofensivo em navegadores sem o problema. Se for mexer nessa parte, teste os dois temas.
