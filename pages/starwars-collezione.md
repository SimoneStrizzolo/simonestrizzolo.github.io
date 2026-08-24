---
layout: page
title: La mia collezione Star Wars
permalink: /starwars/collezione
---

<style>
.fumetti-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px; }
.fumetti-icon { display: block; }
.fumetti-icon img { display: block; width: 100%; aspect-ratio: 2 / 3; object-fit: cover; border-radius: 4px; transition: transform 0.15s ease; }
.fumetti-icon:hover img { transform: scale(1.05); }
.fumetti-panel { display: none; border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 1rem; margin-top: 1.5rem; scroll-margin-top: 72px; }
.fumetti-panel:target { display: block; }
.fumetti-close { display: inline-block; margin-bottom: 1rem; }
</style>

{% assign romanzi = site.data.starwars | where_exp: "s", "s.saga != 'alta-repubblica'" %}
{% assign alta_repubblica = site.data.starwars | where_exp: "s", "s.saga == 'alta-repubblica'" %}

<div id="starwars-grid" markdown="1">

## Romanzi

{% include collezione-sezione.html storie=romanzi personaggi_link=nil data_source="starwars" grid_id="starwars-grid" %}

## Romanzi - L'Alta Repubblica

Sono romanzi ambientati 200 anni prima dei fatti narrati nei film. Sono veramente belli! Ho tutti i libri "young-adult" e "adult": a parte "Una prova di coraggio", ho ignorato i libri per ragazzini.


{% include collezione-sezione.html storie=alta_repubblica personaggi_link=nil data_source="starwars" grid_id="starwars-grid" %}

</div>
