---
layout: page
title: La mia collezione DC Comics
permalink: /dccomics/collezione
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

<div id="dc-comics-grid" markdown="1">

## Fumetti

{% assign dc_comics_storie = site.data["dc-comics"] %}
{% include collezione-sezione.html storie=dc_comics_storie personaggi_link=nil data_source="dc-comics" grid_id="dc-comics-grid" %}

</div>
