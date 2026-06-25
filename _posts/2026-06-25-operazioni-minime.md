---
layout: post
title: "Operazioni minime"
author: "Simone Strizzolo"
categories: tech
tags: [math, tech, nerd]
image: operazioni-minime.jpg
---

# Contesto

Ho recentemente comprato un gioco su Steam chiamato ***Beltmatic***: lo scopo è **creare delle catene di montaggio di "operazioni matematiche"**. I task sono del tipo *costruisci 10 numeri 1 per sbloccare il numero 2*, *costruisci 50 numeri 30 per sbloccare l'operazione moltiplicazione* e così via.

E' chiaro che per costruire tali numeri c'è bisogno di **ottimizzare al massimo la catena** di montaggio: per costruire il 30, per esempio, potrei sommare 30 volte il numero 1 (per un totale di 30 operazioni) oppure moltiplicare il 2, il 3 e il 5 (per un totale di 3 operazioni). 

Quello che volevo fare, quindi, era costruirmi un piccolo algoritmo per ottimizzare al meglio il mio gioco.

![Beltmatic](/assets/img/betlmatic.jpg)

# Problema matematico

Dato un insieme $\mathcal N$ di numeri interi positivi (contenente l'$1$) e un target $i$, calcolare $f(i)$: il numero minimo di operazioni (+, *, ^) per ottenerlo da $\mathcal N$.

# Risoluzione algoritmica

**Caso base:** Se $i\in\mathcal N$, allora $f(i) = 0$

**Caso 1 - Divisione per potenza:** Se $\exists n\in\mathcal N$ tale che $n$ divide $i$:

- Calcola $\tilde f_n(i)=1+f(i/n^p)+f(p)$
- dove $p$ è il massimo intero tale che $n^p$ divide $i$.

**Caso 2 - Moltiplicazione costruita:** Per ogni $n\in\mathcal N$:

- Se $n=1$: $\bar f_1(i) = 1+f(i-1)$
- Se $n>1$: $\bar f_n(i) = 2 + f(i-nk) + f(k)$ dove $k$ è il massimo intero tale che $nk < i$

**Risultato:** $f(i)=\min\{\text{tutti gli } \tilde f_n(i)\text{ e } \bar f_n(i) \text{ disponibili}\}$.

## Dimostrazione

Non ho più le forze per dimostrare che questo algoritmo risolve effettivamente il problema, ma ho fatto un due prove e funziona bene! La complessità computazionale dovrebbe essere $O(i\times\text{card}(\mathcal N)\,)$.

## Risultati

Insieme di test: **N = {1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 13}** (sono i numeri che attualmente ho sbloccato nel gioco).

| Target | f(i) | Percorso     |
| ------ | ---- | ------------ |
| 27     | 1    | 3^3          |
| 29     | 2    | 7*4 + 1      |
| 598    | 3    | (5*9 + 1)*13 |
| 1024   | 1    | 4^5          |
| 1025   | 2    | 4^5 + 1      |

# Codice in Python

Tutta la parte sopra è frutto delle mie notti insonni. Il codice qui sotto è stato fatto dal buon Claude.



```python
#!/usr/bin/env python3
"""Calcolo del numero minimo di operazioni per ottenere un numero da un insieme."""

from functools import lru_cache
from typing import Set, Tuple

MAX_NUM = 10**6
MAX_DEPTH = 30


def min_operazioni(target: int, N: Set[int]) -> Tuple[int, str]:
    """Calcola f(target): numero minimo di operazioni per ottenerlo da N."""

    @lru_cache(maxsize=None)
    def solve(i: int, depth: int = 0) -> Tuple[int, str]:
        if i in N:
            return (0, str(i))
        if i <= 0 or i > MAX_NUM or depth >= MAX_DEPTH:
            return (float('inf'), "")

        best = (float('inf'), "")

        # ============================================
        # Caso 1: f̃_n(i) = 1 + f(i/n^p̄) + f(p̄)
        # ============================================
        for n in N:
            if n <= 1:
                continue

            # Trova massimo p intero tale che n^p divide i
            p_max = 0
            potenza = n
            while potenza <= i:
                if i % potenza == 0:
                    p_max += 1
                    potenza *= n
                else:
                    break

            # Se trovato: f̃_n(i) = 1 + f(i / n^p_max) + f(p_max)
            if p_max > 0:
                potenza_div = n ** p_max
                quoziente = i // potenza_div
                ops_q, path_q = solve(quoziente, depth + 1)
                ops_p, path_p = solve(p_max, depth + 1)
                costo = 1 + ops_q + ops_p

                if costo < best[0]:
                    best = (costo, f"({path_q}) * {n}^({path_p})")

        # ============================================
        # Caso 2: f̄_n(i) = 2 + f(i - nk) + f(k)
        # oppure f̄_1(i) = 1 + f(i - 1)
        # ============================================
        for n in N:
            if n == 1:
                # f̄_1(i) = 1 + f(i - 1)
                ops_residuo, path_residuo = solve(i - 1, depth + 1)
                costo = 1 + ops_residuo
                if costo < best[0]:
                    best = (costo, f"({path_residuo}) + 1")
            else:
                # f̄_n(i) = 2 + f(i - nk) + f(k) dove k max tale che nk < i
                k_max = (i - 1) // n
                if k_max > 0:
                    residuo = i - n * k_max
                    ops_residuo, path_residuo = solve(residuo, depth + 1)
                    ops_k, path_k = solve(k_max, depth + 1)
                    costo = 2 + ops_residuo + ops_k

                    if costo < best[0]:
                        best = (costo, f"({path_k}) * {n} + ({path_residuo})")

        return best

    return solve(target, 0)


if __name__ == "__main__":
    N = {1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 13}
    target = int(input("Target: "))
    ops, path = min_operazioni(target, N)
    print(f"f({target}) = {ops}")
    print(f"Calcolo: {path}")

```
