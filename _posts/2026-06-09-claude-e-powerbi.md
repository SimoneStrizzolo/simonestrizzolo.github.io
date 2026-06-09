---
layout: post
title: "Claude e Power BI"
author: "Simone Strizzolo"
categories: tech
tags: [claude, tech, powerbi]
image: claudepbi.jpg
---

# Licenze necessarie

- Licenza Claude Pro, Max, Team o Enterprise.

- Account Github (per scaricare i plugin).

# Programmi necessari

| Programma        | Link                                                                                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Claude Code      | [Claude Code by Anthropic \| AI Coding Agent, Terminal, IDE](https://claude.com/product/claude-code)                                                              |
| Power BI Desktop | [Power BI Desktop - Download e installazione gratuiti in Windows \| Microsoft Store](https://apps.microsoft.com/detail/9NTXR16HNW1T?hl=it-it&gl=IT&ocid=pdpshare) |
| NodeJS           | [Set up Node.js on native Windows \| Microsoft Learn](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows)                     |

# Setup

## Skill, MCP e plugin

Le **skill** sono un'insieme di file (solitamente chiamati `SKILL.md`) che servono alle AI per imparare conoscenze e metodi di lavoro specifici, come ad esempio lavorare con i file di Power BI. Un'AI senza skill sarebbe sì in grado di interpretare un file `.tmdl` e di proporre delle modifiche, ma non sarebbe in grado di comprendere correttamente la struttura di un intero progetto `.pbip` né potrebbe interfacciarsi direttamente con i dati del modello.

Un **MCP** è invece un protocollo per far interagire un'AI con un applicativo: esiste ad esempio l'MCP server per Power BI, che serve alle AI per fare domande sui dati e ottenere risposte.

I **plugin** sono una collezione di skill e mcp e si ottengono dai marketplace.

## Il plugin per Power BI

Microsoft ha rilasciato su GitHub un set di skill e plugin per lavorare con Fabric e con Power BI (sia da locale che da remoto). [microsoft/skills-for-fabric](https://github.com/microsoft/skills-for-fabric). Per scaricare il plugin è sufficiente seguire la relativa documentazione:

```bash
# Aggiungere il marketplace
/plugin marketplace add microsoft/skills-for-fabric
# Installare l'intero plugin di Fabric
/plugin install fabric-skills@fabric-collection
```

Per lavorare solo con Power BI è sufficiente installare un bundle specifico, quindi `/plugin install powerbi-authoring@fabric-collection`.

## MCP per Power BI

L'MCP è installabile sia tramite Node.js che tramite estensione Visual Studio Code [microsoft/powerbi-modeling-mcp](https://github.com/microsoft/powerbi-modeling-mcp). Il plugin contiene già le istruzioni per installarlo via Node.js quindi non c'è nulla da fare:

> :warning: C'è un bug nel plugin: nel file `marketplace.json` sostituire `"type": "local"` con `"type": "stdio"`.


