export const meta = {
  name: 'generate-collection',
  description: 'Research a list of comics/novels and scaffold a new low-visibility collection (_data/*.yml + pages/*-collezione.md)',
  whenToUse: 'When the user gives a franchise/domain (e.g. "DC Comics", "Star Wars: The High Republic") and a list of titles (with optional edition links) to turn into a new collection page on the blog, following the fumetti/starwars pattern.',
  phases: [
    { title: 'Research', detail: 'one agent per item, researches year/authors/plot' },
    { title: 'Build', detail: 'compiles _data/<name>.yml and pages/<name>-collezione.md, runs jekyll build' },
  ],
}

// args: { name: 'dc-comics', domain: 'DC Comics', items: [{title, link}], isComics: true|false }

const ITEM_SCHEMA = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    titolo: { type: 'string' },
    anno: { type: 'number' },
    autori: { type: 'array', items: { type: 'string' } },
    personaggi: { type: 'array', items: { type: 'string' } },
    edizione: { type: 'string' },
    fumetti: { type: 'string' },
    trama: { type: 'string' },
  },
  required: ['id', 'titolo', 'anno', 'autori', 'personaggi', 'trama'],
}

phase('Research')
const researched = await pipeline(
  args.items,
  (item) =>
    agent(
      `Hai i tool WebSearch e WebFetch: usali direttamente, non dichiarare di non avere accesso al web.
Ricerca questo elemento per una collezione personale "${args.domain}": titolo "${item.title}"${item.link ? `, fonte/edizione: ${item.link}` : ''}.
Prova prima WebFetch sulla fonte data, poi WebSearch (Wikipedia, Wookieepedia/fan wiki pertinente, Goodreads, CBR) se non leggibile o se manca la trama in italiano.
Restituisci: anno di pubblicazione originale, autori/artisti (SOLO nel campo autori, non ripeterli tra parentesi nel titolo anche se il titolo che ti ho passato li includeva), personaggi principali, un id kebab-case, un'edizione (nome collana editoriale italiana se nota, altrimenti una label generica per "${args.domain}"), e una trama in italiano di 3-5 frasi che nomini l'antagonista/conflitto centrale, dica esplicitamente la svolta/morte chiave (niente vaghezze), e descriva come si risolve e cosa prepara. Il campo "titolo" deve contenere SOLO il titolo dell'opera, senza autori tra parentesi.${
        args.isComics ? ' Includi anche il campo "fumetti" con gli albi/numeri originali che compongono questa edizione.' : ''
      }`,
      { schema: ITEM_SCHEMA, phase: 'Research', label: item.title }
    )
)

log(`Ricercati ${researched.filter(Boolean).length}/${args.items.length} elementi`)

phase('Build')
const buildResult = await agent(
  `Nel repo Jekyll corrente, crea una nuova collezione a bassa visibilità "${args.name}" (${args.domain}) a partire da questi elementi già ricercati:

${JSON.stringify(researched.filter(Boolean), null, 2)}

Fai così:
1. Leggi _data/fumetti.yml e pages/starwars-collezione.md come riferimento di schema/pattern (id, titolo, personaggi, anno, edizione, autori, link, trama come blocco ">", immagini come commento placeholder "# TODO: aggiungere immagini in /assets/img/${args.name}/", collegate: []).
2. Scrivi _data/${args.name}.yml con un elemento per ogni voce sopra, usando "link" = il link fornito nell'item originale se presente, altrimenti stringa vuota.
3. Scrivi pages/${args.name}-collezione.md con layout: page, permalink: /${args.name.replace(/-/g, '')}/collezione (mantieni sensato lo slug), che include collezione-sezione.html passando storie=site.data.${args.name.replace(/-/g, '_')} (ATTENZIONE: la chiave YAML in site.data usa il nome file senza estensione, quindi se il file è ${args.name}.yml la chiave è site.data["${args.name}"]), personaggi_link=nil, data_source="${args.name}", grid_id univoco.
4. NON aggiungere questa pagina a _data/settings.yml (deve restare fuori dal menu, raggiungibile solo via link diretto).
5. NON scaricare o creare alcun file immagine (nessuna copertina, nessun asset): il campo immagini resta il solo commento placeholder. Il download di immagini richiede il permesso esplicito dell'utente, che qui non è stato dato.
6. Esegui "bundle exec jekyll build" per verificare che non ci siano errori; se ci sono, correggili.
Riporta alla fine i path dei file creati.`,
  { phase: 'Build', agentType: 'general-purpose' }
)

return { researched: researched.filter(Boolean), buildResult }
