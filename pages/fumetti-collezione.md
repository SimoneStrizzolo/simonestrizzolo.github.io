---
layout: page
title: La mia collezione Marvel
permalink: /fumetti/collezione
---

<style>
.fumetti-grid { display: flex; flex-wrap: wrap; gap: 12px; }
.fumetti-icon { display: block; }
.fumetti-icon img { display: block; height: 190px; width: auto; max-width: 190px; object-fit: contain; border-radius: 4px; transition: transform 0.15s ease; }
.fumetti-icon:hover img { transform: scale(1.05); }
.fumetti-panel { display: none; border: 1px solid var(--border-color, #ccc); border-radius: 8px; padding: 1rem; margin-top: 1.5rem; scroll-margin-top: 72px; }
.fumetti-panel:target { display: block; }
.fumetti-close { display: inline-block; margin-bottom: 1rem; }
</style>

{% assign gruppi = site.data.fumetti | where_exp: "s", "s.formato != 'spillato'" %}
{% assign spillati = site.data.fumetti | where_exp: "s", "s.formato == 'spillato'" %}

<div id="fumetti-grid" markdown="1">

## Volumi

{% include fumetti-sezione.html storie=gruppi %}

## Spillati

{% include fumetti-sezione.html storie=spillati %}

<div class="fumetti-grid">
{% for s in site.data["spillati-solo-cover"] %}
  <a class="fumetti-icon" href="{{ s.link }}" target="_blank" rel="noopener" title="{{ s.titolo }}">
    <img src="{{ s.img }}" alt="{{ s.titolo }} - copertina">
  </a>
{% endfor %}
</div>

</div>

## Timeless variant cover (Alex Ross)

Le variant di Alex Ross con ogni personaggio Marvel (protagonista o antagonista). Ne esistono più di cento: io ho preso i tre Avengers principali (Thor, Iron Man, Cap) e i cattivi principali. Per ritenermi soddisfatto mancherebbero: Mister Fantastic (F4) e Wolverine (X-Men). Collezione completa qui: [collezione Timeless su alexrossart.com](https://www.alexrossart.com/collections/timeless/?type=Book).

<div class="fumetti-grid">
{% for t in site.data["marvel-timeless"] %}
  <a class="fumetti-icon" href="https://www.alexrossart.com/collections/timeless/?type=Book" target="_blank" rel="noopener" title="{{ t.personaggio }}">
    <img src="{{ t.img }}" alt="Timeless variant cover - {{ t.personaggio }}">
  </a>
{% endfor %}
</div>

## Nuovo Universo Ultimate

Ho sostanzialmente preso, per pura collezione, i numeri 1 di ogni serie.

<div class="fumetti-grid">
{% for u in site.data["ultimate-universe"] %}
  <a class="fumetti-icon" href="{{ u.link }}" target="_blank" rel="noopener" title="{{ u.titolo }}">
    <img src="{{ u.img }}" alt="{{ u.titolo }} - copertina">
  </a>
{% endfor %}
</div>

<p><a href="/fumetti/personaggi">→ Vai alle checklist per personaggio</a></p>
