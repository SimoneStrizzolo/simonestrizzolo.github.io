---
layout: post
title: "Bilanciare una board di Catan"
author: "Simone Strizzolo"
categories: tech
tags: [math, tech, nerd]
image: catan/catan-board-6p-rank1.svg
---

# Contesto

Catan è uno dei giochi da tavolo più importanti di sempre, e una parte importante del suo fascino è la randomicità della plancia. Il rovescio della medaglia è che capita spesso di sentire "che schifo di mappa!" appena finito di piazzare le tessere. Mi sono quindi chiesto: quando una board è davvero "buona" e quando non lo è?

# Letteratura

Qualcuno, ovviamente, ci aveva già pensato prima di me: [What is a balanced Catan board? – Board Game Analysis](https://www.boardgameanalysis.com/what-is-a-balanced-catan-board/#balanced-catan-boards). L'idea di base è quella di definire un insieme di metriche che, messe insieme, descrivano quanto una board è equilibrata.

Le metriche in questione:

- si divide la mappa di Catan in 6 fette, usando tre linee immaginarie;

- **Resource distribution on the island**: per ogni linea, si calcola quante volte compare ciascuna risorsa a sinistra e a destra, e se ne prende il quadrato della differenza. Si ripete per tutte e tre le linee: più basso il numero, meglio è;

- **Resource clustering**: ogni volta che due tessere della stessa risorsa sono adiacenti, si aggiungono 5 punti di penalità. Anche qui, più basso è meglio;

- **Probability distribution per resource**: è la probabilità che, tirando i dadi, esca proprio quella risorsa. Dipende sia dalla frequenza di uscita dei numeri sia da quante tessere di quella risorsa sono presenti sulla board;

- **Probability distribution della board**: assime al successivo, sono probabilmente i KPI più interessanti, perché garantiscono che i numeri sulla board siano distribuiti in modo uniforme. È concettualmente identico alla precedente, ma applicato ai numeri lungo le tre linee;

- **Number clustering**: assegna 5 punti di penalità ogni volta che due tessere adiacenti hanno lo stesso numero, per evitare che numeri "buoni" si concentrino tutti nella stessa zona.

L'autore usa anche una metrica sui porti, che invece a me non interessava.

Da queste metriche normalizzate, l'autore ricava un unico indice medio: il **CIBI**, Catan Island Balance Index. Per trovare le board migliori ha poi lanciato un algoritmo di generazione casuale, arrivando a valutare circa 100 milioni di mappe.

Qui un paio di esempi di plancia ben bilanciata e mal bilanciata:

<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:16px;">
  <div style="text-align:center;">
    <img src="/assets/img/catan/catan-board-4p-top.svg" alt="Board Catan 4 giocatori mal bilanciata" style="width:100%">
    <br><small>Board mal bilanciata</small>
  </div>
  <div style="text-align:center;">
    <img src="/assets/img/catan/catan-board-4p-bad.svg" alt="Board Catan 4 giocatori ben bilanciata" style="width:100%">
    <br><small>Board ben bilanciata</small>
  </div>
</div>

## Estensione a 5/6 giocatori

Ho fatto la stessa cosa, ma per la mappa a sei giocatori! Quella "ufficiale" ha 2 deserti, io ne ho messi 4 perché mi servivano per un'altra variante del gioco. Non potevo aspettare di generare 100 milioni di board come nell'articolo originale, quindi mi sono fermato a 1 milione di iterazioni. Su quel risultato ho poi applicato un local-search: ho preso la board migliore trovata e ho iniziato a scambiare qualche numero e qualche tessera. È stato un gran bel tocco, perché ha abbassato il CIBI del 77,5% rispetto al punto di partenza.

Qui le mappe che ho ottenuto.

<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:16px;">
  <div style="text-align:center;">
    <img src="/assets/img/catan/catan-board-6p-rank1.svg" alt="Migliore board Catan a 6 giocatori" style="width:100%">
    <br><small>1° posto (CIBI 0.017)</small>
  </div>
  <div style="text-align:center;">
    <img src="/assets/img/catan/catan-board-6p-rank2.svg" alt="Seconda miglior board Catan a 6 giocatori" style="width:100%">
    <br><small>2° posto (CIBI 0.019)</small>
  </div>
  <div style="text-align:center;">
    <img src="/assets/img/catan/catan-board-6p-rank3.svg" alt="Terza miglior board Catan a 6 giocatori" style="width:100%">
    <br><small>3° posto (CIBI 0.019)</small>
  </div>
</div>
