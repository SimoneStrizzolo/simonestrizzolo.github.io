---
layout: page
title: La mia collezione Marvel
permalink: /marvel/collezione
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

{% assign gruppi = site.data["marvel-comics"] | where_exp: "s", "s.spillato != true" | where_exp: "s", "s.thanos != true" | sort: "anno" %}
{% assign spillati = site.data["marvel-comics"] | where_exp: "s", "s.spillato == true" | where_exp: "s", "s.thanos != true" | sort: "anno" %}
{% assign thanos = site.data["marvel-comics"] | where_exp: "s", "s.thanos == true" | sort: "anno" %}

{% include collezioni-nav.html %}

<div id="fumetti-grid" markdown="1">

## Volumi

{% include marvel-sezione.html storie=gruppi %}

## Spillati

{% include marvel-sezione.html storie=spillati %}

{% assign spillati_solo_cover = site.data["marvel-cover-collezioni"] | where: "categoria", "spillati-solo-cover" %}
{% include cover-grid.html items=spillati_solo_cover %}

## Thanos

E' il mio personaggio preferito. Ho quasi tutto di lui.

{% include marvel-sezione.html storie=thanos %}

</div>

## Timeless variant cover (Alex Ross)

Le variant di Alex Ross con ogni personaggio Marvel (protagonista o antagonista). Ne esistono più di cento: io ho preso i tre Avengers principali (Thor, Iron Man, Cap) e i cattivi principali. Per ritenermi soddisfatto mancherebbero: Mister Fantastic (F4) e Wolverine (X-Men). Collezione completa qui: [collezione Timeless su alexrossart.com](https://www.alexrossart.com/collections/timeless/?type=Book).

{% assign timeless = site.data["marvel-cover-collezioni"] | where: "categoria", "timeless" %}
{% include cover-grid.html items=timeless %}

## Nuovo Universo Ultimate

Ho sostanzialmente preso, per pura collezione, i numeri 1 di ogni serie.

{% assign ultimate_universe = site.data["marvel-cover-collezioni"] | where: "categoria", "ultimate-universe" %}
{% include cover-grid.html items=ultimate_universe %}
