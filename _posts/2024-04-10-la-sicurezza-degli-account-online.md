---
layout: post
title: "La sicurezza degli account online"
author: "Simone Strizzolo"
categories: tech
tags: [security]
image: sicurezza-passkey.jpg
---

# Premessa

Parlerò poco di Apple in quanto non possiedo i suoi dispositivi.

# Perché ne parlo

Pochi giorni fa ho resettato il mio smartphone Android e solo grazie ad un intervento divino sono riuscito a recuperare i miei account (ho anche rischiato di essere sbattuto fuori da Google). Ho riflettuto quindi sulla leggerezza con cui ho sempre gestito la mia sicurezza online.

# Definizioni preliminari 1: cos'è l'autenticazione

Un utente che vuole connettersi ad un account online deve essere in grado di verificare la sua identità: questo si chiama **autenticarsi**. L'autenticazione può essere fatta usando:

* qualcosa che si sa (knowledge-based factor);
* qualcosa che si ha (possession-based factor);
* qualcosa che si è (inherence-based factor).

## Knowledge-based factor: qualcosa che si sa

Rappresenta qualcosa che solamente l'utente può sapere: solitamente è una password, ossia un insieme di caratteri alfanumerici, un PIN (una sequenza di numeri) oppure una risposta ad una domanda personale.

## Possession-based factor: qualcosa che si ha

Rappresenta una delle seguenti soluzioni moderne e mobile-friendly:

* _email magic link_, ossia un link che viene inviato tramite mail;
* _SMS one-time passcode (OTP)_, ossia un codice che viene inviato tramite SMS;
* _time-based one-time passcode (TOTP)_, ossia un codice di 6 cifre che si rigenera periodicamente e che solitamente è gestito da delle "app di autenticazione". Nota: il TOPT è generato da un algoritmo segreto ed è indipendente dall'app di autenticazione utilizzata. Le app più famose sono: Google Authenticator, Microsoft Authenticator, Bitwarden Authenticator, Authy, Zoho OneAuth;
* _push notification_, ossia una notifica che viene inviata ad una app mobile.

Può rappresentare anche una _chiavetta fisica_ che, durante il processo di autenticazione, si collega al proprio PC/smartphone. Le chiavette più famose sono le [YubiCo](https://www.yubico.com/).

## Inherence-based factor: qualcosa che si è

Rappresenta solitamente un'informazione biometrica come il volto oppure l'impronta digitale.

# Definizioni preliminari 2: processi di autenticazione

Vediamo ora come applicare questi fattori durante il processo di autenticazione.

## Single-factor authentication (SFA)

L'utente si autentica tramite uno dei tre fattori citati precedentemente. A livello pratico coincide con la richiesta di inserimento di una password o un PIN. È la modalità più semplice di autenticazione.

## Two-factor authentication (2FA)

L'utente si autentica usando due fattori. Le combinazioni più usate sono:

* **password + OTP/TOPT**: è lo standard di sicurezza più moderno e diffuso. È sinonimo (improprio) del concetto stesso di 2FA;
* **passkey**: è il futuro dell'autenticazione in quanto non prevede che l'utente memorizzi nessuna password o PIN. Tutto si basa sul possesso di un dispositivo e di un'informazione biometrica. Le coppie più usate sono: smartphone + impronta digitale, smartphone + volto e PC + Windows Hello.

## Multi-factor authentication (MFA)

Modalità di autenticazione in cui è possibile configurare più sistemi di 2FA. È più sicuro rispetto alla 2FA in quanto non sempre, ad esempio, si ha a disposizione il proprio telefono.

# Le considerazioni che ho fatto

La SFA è da considerarsi ormai insicura, e non solo per i possibili attacchi dall'esterno: quanti, infatti, usano la stessa password per tutti i propri account? E quante volte la dimenticano? Vogliamo quindi eliminare la SFA laddove possibile: laddove non possibile vogliamo affidarci ad un password manager, cioè un servizio che permette la creazione e memorizzazione delle password.

> MUST: il password manager **_deve_** essere multipiattaforma perché non dobbiamo far dipendere le nostre identità digitali da nessun ecosistema o dispositivo.

La 2FA "classica" (password + codice) migliora sul fronte sicurezza ma pecca in praticità in quanto richiede quasi sempre la presenza fisica del proprio smartphone. Se usata maldestramente è anche pericolosa perché rischia di bloccare l'accesso ai propri account (ad esempio se si perde il telefono). Non voglio utilizzare chiavette fisiche come YubiCo in quanto, come per lo smartphone, non voglio dipendere da oggetti fisici che potrei perdere. L'MFA ovvia al problema della 2FA in quanto l'utilizzatore può usare più forme di verifica secondaria (SMS, email ecc.) tuttavia ne eredità la laboriosità.

Dedico infine un paragrafo alle passkey. Mi piacciono molto perché mi permettono di eliminare completamente le password, però hanno lo stesso problema della 2FA "classica": cosa succede se perdo il dispositivo? Apple permette di sincronizzare le passkey in tutti i dispositivi dell'ecosistema, ma Google e Microsoft no. Inoltre, al momento, il numero di servizi online che offrono l'autenticazione tramite passkey è basso (lista completa qui [Passkeys Index (](https://passkeyindex.io/)[passkeyindex.io](http://passkeyindex.io/)[)](https://passkeyindex.io/)).

> NICE TO HAVE: laddove possibile vorrei usare delle forme di 2FA/MFA che non dipendano dal dispositivo utilizzato.

# Le decisioni che ho preso

## Password manager - Bitwarden

<img src="https://media.licdn.com/dms/image/v2/D5612AQGBER0UoYfgeQ/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1712768403458?e=1780531200&v=beta&t=MD-1EQw5YptQfxl3vHe6_vv7pxqZXrsPxWuYkXBv3Ts" title="" alt="Contenuto dell’articolo" data-align="inline">

Google, Apple e Microsoft hanno un sistema di gestione password nativo tuttavia sono vincolate ai loro ecosistemi: non è possibile ad esempio usare il gestore di Google su Windows e viceversa. Ho scelto quindi [_Bitwarden_](https://bitwarden.com/) in quanto è un servizio multipiattaforma, open-source, gratuito ed è da parecchio tempo a questa parte la [scelta migliore](https://www.nytimes.com/wirecutter/reviews/best-password-managers/) indicata online.

## App di autenticazione per 2FA e MFA - Zoho

![Contenuto dell’articolo](https://media.licdn.com/dms/image/v2/D5612AQFOvxNpRTtCfg/article-inline_image-shrink_1500_2232/article-inline_image-shrink_1500_2232/0/1712768403026?e=1780531200&v=beta&t=H6QPsbO1hnfAIcSaDB5dQgQiCjV0SUyWZzjYKCJj4VA)

Tutti i servizi online permettono al giorno d'oggi di usare un codice TOTP come secondo fattore di verifica, quindi userà questa modalità per le mie modalità 2FA/MFA. Passiamo quindi alla scelta dell'app.

* Per Google, Apple e Microsoft valgono le stesse considerazioni precedenti.
* Bitwarden si offre anche come servizio di autenticazione secondario ma: il supporto al TOTP è a pagamento; concentrerei tutti i passaggi di autenticazione (password e codice) in un unico servizio. Sarebbe comodo ma ci sarebbero due problemi: non potrei usare la 2FA/MFA per mettere in sicurezza Bitwarden stesso; la sicurezza dell'account di Bitwarden consisterebbe quindi in una sola password, e non è il massimo.
* Ho deciso quindi di utilizzare [_Zoho_](https://www.zoho.com/it/accounts/oneauth.html) in quanto è multipiattaforma e gratuito. La scelta è stata facile in quanto [non esistono competitor](https://www.reddit.com/r/privacy/comments/1aphpcq/comment/kqou995/?utm_source=share&utm_medium=web2x&context=3) con queste due caratteristiche.

## Passkey manager - Bitwarden

Bitwarden supporta le passkey tuttavia:

* permette il salvataggio di una sola passkey per ogni login. Non è possibile quindi salvare contemporaneamente l'impronta del proprio smartphone e il volto di Windows Hello;
* non supporta ancora la gestione delle passkey su dispositivi mobili.

Lo userò quando non avrà più queste due limitazioni: nel frattempo devo scegliere forzatamente _Google._ Per dare una parvenza di soluzione "multipiattaforma" ho deciso di creare delle passkey anche sul mio PC _Windows_ di casa ogniqualvolta ne creo una su Google.

## Registrazione su nuovi siti

Alcuni siti (ad esempio Spotify e X) permettono di registrarsi utilizzando altri provider come Google, Apple e Meta. Per evitare dispersione di password userò la registrazione tramite Google laddove possibile. Non sono preoccupato dalla sicurezza in quanto l'account Google sarà ben protetto da Zoho e Bitwarden. Microsoft è poco presente in questo contesto quindi accentrerò tutto su Google.

# I risultati finali

Verifichiamo ora se le scelte fatte mi permetteranno di avere i miei account al sicuro.

## I servizi base

Bitwarden e Zoho sono il nucleo del mio sistema di sicurezza: posso accedere ad ogni altro servizio partendo da questi due. Ho deciso di usare utente + password per Zoho e 2FA per Bitwarden. In questo modo:

* l'account Zoho è fragile ma da solo è inutile: se me lo rubassero, all'interno troverebbero solamente i codici TOTP che sono inutili da soli;
* se volessero rubarmi Bitwarden dovrebbero, di fatto, essere a conoscenza sia della password di Bitwarden che di Zoho;
* mi basta ricordare le password dei due account per ricostruire tutto il mio sistema di sicurezza su un nuovo ecosistema/dispositivo, anche nel caso in cui io perda il mio telefono/PC.

## Autenticarsi a Google e Microsoft

Google: Password + TOPT su Bitwarden e Zoho. Ho configurato delle passkey anche sul mio telefono e PC in modo da agevolare i login quando ho almeno uno dei due dispositivi sottomano.

Microsoft: è l'unica piattaforma che ad oggi supporta un sistema di autenticazione completamente passwordless. Posso autenticarmi con nome utente + Microsoft Authenticator su Android, passkey su Android oppure codice ottenibile tramite mail dell'account di Google. Il mio account MS dipende quindi da quello di Google, ma quest'ultimo è al sicuro grazie a tutto quello che ho detto prima.

## Che succede se perdo i miei dispositivi?

Supponendo di aver perso sia lo smartphone che il PC, e quindi le relative passkey, posso facilmente ripartire da Zoho e Bitwarden per re-impostare tutto. NOTA: nel diagramma sottostante mi concentro solamente sui quattro sistemi base ossia Zoho, Google, MS e Bitwarden; tutti i miei altri servizi (Paypal, Spotify, X, Facebook, Instagram ecc.) sono derivabili da questi quattro.

![Contenuto dell’articolo](https://media.licdn.com/dms/image/v2/D5612AQGkFLL4JNtNcw/article-inline_image-shrink_1500_2232/article-inline_image-shrink_1500_2232/0/1712768403169?e=1780531200&v=beta&t=gCLoefIFPjxcPQXVMphCmg39I-Z9hkIlj3ENPIb5hBk)

# Esempi concreti

Ora che ho un sistema sicuro e sempre funzionante per accedere ai miei quattro servizi principali, vediamo qualche esempio concreto.

* Paypal permette l'autenticazione tramite passkey solamente sui dispositivi mobile, quindi ne ho creata una sul mio Android. Per il resto ho configurato una 2FA basandomi su password + Zoho.
* Spotify permette di loggarsi tramite account Google quindi siamo a posto.
* Instagram e Facebook, al momento, non supportano le passkey tuttavia accetta la 2FA "classica" password + Zoho.
* Anche Spofity permette di autenticarsi tramite account Google. Purtroppo l'ho scoperto solo recentemente quindi non ho modo per rimuovere la vecchia password di accesso. Ho impostato quindi la solita 2FA password + Zoho.
* Intesa Sanpaolo offre solamente l'autenticazione tramite PIN + OTP oppure PIN + approvazione app Intesa, quindi ho configurato entrambe.
* Amazon permette di autenticarsi tramite passkey: l'ho configurata sia sul mio PC che su Android.

# Sitografia

- [Are passkeys considered a form of two-factor authentication?](https://www.corbado.com/blog/psd2-passkeys/are-passkeys-two-factor-authentication)

- [All Things Secured - YouTube](https://www.youtube.com/@AllThingsSecured)
