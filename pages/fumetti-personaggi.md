---
layout: page
title: Personaggi - Checklist storie
permalink: /fumetti/personaggi
---

<p><a href="/fumetti/collezione">← Torna alla collezione</a></p>

{% for entry in site.data["storie-canoniche"] %}
  {% assign nome = entry[0] %}
  {% assign storie = entry[1] %}
  <div id="{{ nome | slugify }}" style="margin-bottom:2rem;">
    <h2>{{ nome }}</h2>
    <ul>
      {% for s in storie %}
        {% if s.id %}
          <li>✅ <a href="/fumetti/collezione#{{ s.id }}">{{ s.titolo }}</a> — {{ s.descrizione }}</li>
        {% else %}
          <li>❌ {{ s.titolo }} <em>(non posseduta)</em> — {{ s.descrizione }}
            {% if s.link %}
              (<a href="{{ s.link }}" target="_blank" rel="noopener">link</a>)
            {% endif %}
            {% if s["link-mu"] %}
              (<a href="{{ s["link-mu"] }}" target="_blank" rel="noopener">Marvel Unlimited</a>)
            {% endif %}
          </li>
        {% endif %}
      {% endfor %}
    </ul>
  </div>
{% endfor %}
