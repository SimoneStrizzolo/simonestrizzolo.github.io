# simonestrizzolo.github.io

Sito personale costruito con [Jekyll](https://jekyllrb.com/) e il tema [Millennial](https://github.com/LeNPaul/Millennial), pubblicato tramite [GitHub Pages](https://pages.github.com/).

---

## Indice

1. [Come funziona](#come-funziona)
2. [Struttura del progetto](#struttura-del-progetto)
3. [Configurazione iniziale](#configurazione-iniziale)
   - [_config.yml](#_configyml)
   - [_data/settings.yml](#_datasettingsyml)
4. [Scrivere contenuti](#scrivere-contenuti)
   - [Post del blog](#post-del-blog)
   - [Pagine statiche](#pagine-statiche)
   - [Immagini](#immagini)
5. [Front matter: la guida completa](#front-matter-la-guida-completa)
6. [Layout disponibili](#layout-disponibili)
7. [Funzionalità opzionali](#funzionalità-opzionali)
   - [Commenti con Disqus](#commenti-con-disqus)
   - [Google Analytics](#google-analytics)
   - [Social media](#social-media)
   - [Formule matematiche (MathJax)](#formule-matematiche-mathjax)
   - [Syntax highlighting](#syntax-highlighting)
8. [Anteprima locale](#anteprima-locale)
9. [Flusso di lavoro](#flusso-di-lavoro)
10. [Markdown: riferimento rapido](#markdown-riferimento-rapido)

---

## Come funziona

Jekyll è un generatore di siti statici: prende i tuoi file Markdown, li combina con i template HTML del tema, e produce un sito HTML puro. GitHub Pages esegue questa build automaticamente ogni volta che fai push su `main`.

Nessun database, nessun server da gestire. Scrivi, fai push, il sito si aggiorna.

---

## Struttura del progetto

```
simonestrizzolo.github.io/
│
├── _config.yml              # Impostazioni principali del sito (titolo, autore, plugin)
├── _data/
│   └── settings.yml         # Menu, social, commenti, analytics, testi personalizzabili
│
├── _posts/                  # I tuoi articoli del blog (qui scrivi i post)
│   └── YYYY-MM-DD-titolo.md
│
├── pages/                   # Pagine statiche (Chi sono, Contatti, ecc.)
│   ├── about.md
│   ├── contact.md
│   └── ...
│
├── _layouts/                # Template HTML per post e pagine (non modificare)
├── _includes/               # Componenti riutilizzabili: header, footer, ecc. (non modificare)
├── _sass/                   # Fogli di stile SCSS (modifica solo se sai quello che fai)
│
├── assets/
│   ├── css/                 # CSS compilato
│   └── img/                 # Immagini usate nei post e nelle pagine
│
├── index.html               # Homepage
├── rss-feed.xml             # Feed RSS
├── Gemfile                  # Dipendenze Ruby per Jekyll
└── 404.md                   # Pagina di errore personalizzata
```

**Dove intervieni quasi sempre:**
- `_posts/` — per i nuovi articoli
- `pages/` — per le pagine statiche
- `assets/img/` — per le immagini
- `_config.yml` e `_data/settings.yml` — per la configurazione del sito

---

## Configurazione iniziale

### `_config.yml`

File di configurazione principale di Jekyll. Modificalo una volta all'inizio per personalizzare il sito.

```yaml
title:       "Il mio sito"
description: "Articoli su tecnologia, design e altro"
author:      "Simone Strizzolo"

paginate: 5          # Quanti post mostrare per pagina in homepage
permalink: /:title   # Formato degli URL (es. /il-mio-articolo)
```

> Ogni modifica a `_config.yml` forza una rebuild completa del sito su GitHub Pages.

### `_data/settings.yml`

Controlla l'aspetto e il comportamento del sito senza toccare l'HTML. È il "pannello di controllo" del tema.

```yaml
# Commenti Disqus (false = disabilitati)
disqus:
  comments: false
  disqus_shortname: 'il-tuo-shortname'

# Google Analytics
google-ID: 'G-XXXXXXXXXX'

# Voci del menu di navigazione
menu:
- {name: 'About',    url: 'about'}
- {name: 'Contatti', url: 'contact'}
- {name: 'Blog',     url: 'sample-posts'}

# Social media (icone Font Awesome)
social:
- {icon: 'linkedin', link: 'https://www.linkedin.com/in/simonestrizzolo'}
- {icon: 'envelope', link: 'mailto:simone.strizzolo@gmail.com'}
- {icon: 'github',   link: 'https://github.com/simonestrizzolo'}

# Testi personalizzabili
post_date_prefix: 'Scritto il'
related_posts:    'Potrebbe interessarti anche...'
```

---

## Scrivere contenuti

### Post del blog

I post vanno nella cartella `_posts/`. Il nome del file deve seguire obbligatoriamente questa convenzione:

```
YYYY-MM-DD-titolo-del-post.md
```

Esempi:
```
_posts/2026-05-17-il-mio-primo-articolo.md
_posts/2026-06-01-riflessioni-sul-design.md
_posts/2026-06-15-guida-a-jekyll.md
```

> Post con data futura non vengono pubblicati finché quella data non arriva — utile per programmare le uscite.

**Struttura minima di un post:**

```markdown
---
layout: post
title: "Il titolo del mio articolo"
author: "Simone Strizzolo"
categories: tech
tags: [jekyll, blog, tutorial]
image: nome-immagine.jpg
---

Introduzione: un paragrafo che cattura l'attenzione del lettore.

## Prima sezione

Contenuto della sezione...

## Seconda sezione

Altro contenuto...
```

### Pagine statiche

Le pagine statiche vanno nella cartella `pages/`. A differenza dei post non hanno una data e non compaiono nel feed del blog, ma possono apparire nel menu di navigazione.

**Struttura di una pagina:**

```markdown
---
layout: page
title: "Chi sono"
permalink: /about
---

Ciao! Sono Simone, sviluppatore e appassionato di tecnologia...
```

Per aggiungere la pagina al menu, modifica `_data/settings.yml`:

```yaml
menu:
- {name: 'Chi sono', url: 'about'}
```

Il valore `url` corrisponde al `permalink` senza lo slash iniziale.

### Immagini

Salva le immagini in `assets/img/` e referenziale nel front matter del post con solo il nome del file:

```yaml
image: mia-foto.jpg
```

L'immagine verrà usata come header del post e come anteprima nei link condivisi sui social.

**Consigli:**
- Usa immagini orizzontali (landscape), idealmente con proporzioni 16:9
- Comprimi le immagini prima di caricarle (strumenti: [Squoosh](https://squoosh.app/), [TinyPNG](https://tinypng.com/))
- Nomi file senza spazi o caratteri speciali (usa `-` al posto degli spazi)

---

## Front matter: la guida completa

Il front matter è il blocco YAML tra i `---` all'inizio di ogni file. Jekyll lo usa per determinare come renderizzare il contenuto.

```yaml
---
layout: post          # Obbligatorio: post | page | home | category
title: "Titolo"       # Obbligatorio: titolo del post o della pagina
author: "Nome"        # Nome dell'autore (compare sotto il titolo)
categories: tech      # Categoria: usata per organizzare e filtrare i post
tags: [tag1, tag2]    # Tag: usati per i "post correlati" a fondo pagina
image: foto.jpg       # Immagine header (file in assets/img/)
permalink: /url       # URL personalizzato (opzionale, di default è il titolo)
---
```

| Campo | Obbligatorio | Descrizione |
|-------|:---:|---|
| `layout` | Sì | Template da usare |
| `title` | Sì | Titolo visualizzato |
| `author` | No | Nome autore |
| `categories` | No | Categoria del post |
| `tags` | No | Parole chiave per i post correlati |
| `image` | No | Immagine di copertina |
| `permalink` | No | URL personalizzato |

---

## Layout disponibili

| Layout | Usato per | Caratteristiche |
|--------|-----------|-----------------|
| `post` | Articoli del blog | Header immagine, data, autore, condivisione social, post correlati, commenti |
| `page` | Pagine statiche | Layout pulito senza metadati del blog |
| `home` | Homepage | Mostra i post in anteprima con paginazione |
| `category` | Pagine categoria | Lista dei post filtrati per categoria |

---

## Funzionalità opzionali

### Commenti con Disqus

1. Crea un account su [disqus.com](https://disqus.com/) e registra il tuo sito
2. Ottieni il tuo `shortname`
3. Modifica `_data/settings.yml`:

```yaml
disqus:
  comments: true
  disqus_shortname: 'il-tuo-shortname'
```

### Google Analytics

1. Crea una proprietà su [Google Analytics](https://analytics.google.com/)
2. Ottieni il tuo ID (formato `G-XXXXXXXXXX`)
3. Modifica `_data/settings.yml`:

```yaml
google-ID: 'G-XXXXXXXXXX'
```

### Social media

Le icone social sono gestite tramite [Font Awesome](https://fontawesome.com/). Qualsiasi icona disponibile in Font Awesome 4 può essere usata.

```yaml
social:
- {icon: 'linkedin',  link: 'https://www.linkedin.com/in/...'}
- {icon: 'github',    link: 'https://github.com/...'}
- {icon: 'twitter',   link: 'https://twitter.com/...'}
- {icon: 'envelope',  link: 'mailto:tua@email.com'}
- {icon: 'rss-square', link: 'feed.xml'}
```

### Formule matematiche (MathJax)

Il tema supporta LaTeX tramite MathJax. Scrivi le formule direttamente nei post:

```markdown
Inline: $E = mc^2$

Blocco:
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

### Syntax highlighting

I blocchi di codice vengono colorati automaticamente. Specifica il linguaggio dopo i tre backtick:

````markdown
```python
def saluta(nome):
    return f"Ciao, {nome}!"
```

```javascript
const saluta = nome => `Ciao, ${nome}!`;
```

```bash
jekyll serve --livereload
```
````

Linguaggi supportati: Python, JavaScript, Ruby, Go, Rust, SQL, HTML, CSS, Bash, e [molti altri](https://github.com/rouge-ruby/rouge/wiki/List-of-supported-languages-and-lexers).

---

## Anteprima locale

Per vedere il sito in locale prima di pubblicare:

**Prerequisiti:** Ruby e Bundler installati sul sistema.

```bash
# Prima volta: installa le dipendenze
bundle install

# Avvia il server locale
bundle exec jekyll serve

# Con ricaricamento automatico
bundle exec jekyll serve --livereload
```

Il sito sarà disponibile su `http://localhost:4000`.

> Su Windows, se incontri problemi con Jekyll, considera di usare [WSL](https://docs.microsoft.com/it-it/windows/wsl/) (Windows Subsystem for Linux).

---

## Flusso di lavoro

**Pubblicare un nuovo post:**

```bash
# 1. Crea il file del post
# File: _posts/2026-05-17-il-mio-articolo.md

# 2. Aggiungi eventuali immagini in assets/img/

# 3. Fai push su GitHub
git add .
git commit -m "Nuovo post: il mio articolo"
git push

# 4. Aspetta ~1 minuto e il sito si aggiorna automaticamente
```

**Modificare la configurazione:**

```bash
# Modifica _config.yml o _data/settings.yml
git add _config.yml _data/settings.yml
git commit -m "Aggiornata configurazione sito"
git push
```

**Verificare lo stato della build:**  
Vai su `github.com/simonestrizzolo/simonestrizzolo.github.io` → tab **Actions** per vedere se la build è andata a buon fine.

---

## Markdown: riferimento rapido

```markdown
# Titolo H1
## Titolo H2
### Titolo H3

**grassetto**   *corsivo*   ~~barrato~~

- Lista non ordinata
- Secondo elemento
  - Elemento annidato

1. Lista ordinata
2. Secondo elemento

[testo del link](https://esempio.com)

![alt text](assets/img/immagine.jpg)

> Citazione o blockquote

---   (linea orizzontale)

`codice inline`

| Colonna 1 | Colonna 2 |
|-----------|-----------|
| Cella 1   | Cella 2   |
```

---

## Licenza

Il tema Millennial è distribuito sotto licenza [MIT](LICENSE.md). I contenuti del sito appartengono a Simone Strizzolo.
