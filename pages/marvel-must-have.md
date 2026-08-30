---
layout: page
title: "I Must Have della Marvel"
permalink: /marvel/must-have
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

La collana Marvel Must Have contiene le migliori storie dagli anni '60 ad oggi. La collezione completa è disponibile qui: [comicsbox.it/serie/MARVELMUST](https://www.comicsbox.it/serie/MARVELMUST).

Qui quelli che, a parere degli esperti, sono dei real must have: quelli spuntati li ho nella mia collezione.

{% assign must_have_storie = site.data["marvel-must-have"] %}

<div id="musthave-grid" markdown="1">

{% include collezione-sezione.html storie=must_have_storie data_source="marvel-must-have" grid_id="musthave-grid" %}

</div>
