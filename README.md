# MX RESCISÃO

Conferidor automático de rescisão trabalhista. HTML único, offline, sem dependências.

## Como usar

1. Abra `index.html` no navegador.
2. Abra o **Relatório Analítico do Cálculo de Rescisão** em PDF, `Ctrl+A` / `Ctrl+C`.
3. Cole na tela inicial — `Ctrl+V` funciona em qualquer ponto da página, e também dá para
   arrastar um `.txt` para dentro dela.

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

214 verificações: utilitários, avos, art. 130, aviso proporcional, INSS, parser dos dois
relatórios reais, auditoria completa dos dois casos, o vínculo achado→rubrica que alimenta o
destaque cruzado, o veredito, as unidades dos achados, o módulo de convenções (vigência,
piso, aviso ampliado, data-base, multa, assistencial, homologação, estabilidade, cláusulas
livres) e 18 cenários sintéticos de erro (pagamento atrasado, projeção errada, justa causa
com verbas indevidas, avo do aviso esquecido, terço faltando, multa a menor, aviso indenizado
na base do INSS, médias ausentes, férias em dobro, VT acima de 6%, compensação excessiva).

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
