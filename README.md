# 🚀 EPIQUIZ - Build Week 1
Benvenuto nel repository di **EPIQUIZ**, un'applicazione web interattiva per quiz a risposta multipla sul mondo dell'informatica. Il progetto è stato sviluppato come Single Page Application (SPA) incentrata sulla manipolazione dinamica del DOM e sulla gestione avanzata del tempo tramite JavaScript Vanilla.

---
## Indice dei Contenuti
1. [🎯 Obiettivi del Progetto](#obiettivi-del-progetto)
2. [💻 Tecnologie Utilizzate](#tecnologie-utilizzate)
3. [📂 Struttura del Progetto](#struttura-del-progetto)
4. [🔧 Architettura del Codice (State-Render-Events)](#architettura-del-codice-state-render-events)
5. [⚙️ Funzioni Principali](#funzioni-principali)
6. [💡 Funzionalità nel Dettaglio](#funzionalita-nel-dettaglio)
7. [🚀 Possibili Migliorie](#possibili-migliorie)

---
## Obiettivi del Progetto
L'obiettivo principale di questa Build Week è stato simulare un ambiente di lavoro reale in team, focalizzandoci su:
- **Manipolazione avanzata del DOM** senza l'ausilio di framework esterni.
- **Gestione dello stato globale** dell'applicazione in JavaScript.
- Controllo dei flussi temporali asincroni (`setInterval` e `setTimeout`).
- Integrazione di librerie esterne tramite CDN (Chart.js per i grafici dei risultati).
- Scrittura di codice moderno, modulare e pulito seguendo gli standard **ES6**.

---
## Tecnologie Utilizzate
L'applicazione è stata sviluppata utilizzando un parco tecnologie snello e performante:
<!-- eventualmente aggiungere badge, screenshot e quant'altro -->
- HTML
- CSS
- JS
-
-


---

## Struttura del Progetto
Il progetto è strutturato come una **Single Page Application (SPA)**. Il file HTML rimane fisso, mentre JavaScript si occupa di svuotare e ripopolare il tag `<main id="app">` in base alla schermata corrente.
```text
├── index.html                  # File HTML principale (Entry-point unico)
├── assets/
│   ├── css/
│   │   └── style.css           # Fogli di stile, layout e animazioni custom
│   ├── js/
│   │   └── script.js           # Stato globale, database domande e logica del quiz
│   ├── img/
│   │   ├── epicode-logo.png    # Logo istituzionale nell'header
│   │   └── bg.jpg              # Immagine di sfondo dell'applicazione
```

---

## Architettura del Codice (State-Render-Events)
L'applicazione segue il pattern architetturale **State ➡️ Render ➡️ Events**, garantendo una separazione netta tra i dati e l'interfaccia visiva:

-
-
-
-
-

---

## Funzioni Principali
Il comportamento e l'interattività dell'applicazione sono governati dalle seguenti funzioni JavaScript

* **`renderWelcome()`**: Genera la schermata iniziale di benvenuto. Inizializza lo stato del quiz (azzerando score e numero domanda) e mescola l'array delle domande tramite la funzione `shuffleQuestions()`. In questo modo le domande verranno prese in maniera casuale, così come le risposte (garantendo che la risposta corretta non si trovi nella stessa posizione per tutte le domande).
* **`renderQuiz()`**: Il motore principale dell'applicazione. Si occupa di:
  * Pushare la domanda corrente (prendendola da un nuvo array `let shuffledQuestions = [];`) e le relative opzioni di risposta (mescolate dinamicamente anch'esse).
  * Gestire gli eventi di click sulle risposte, applicando le classi CSS (`.correct` o `.wrong`) per il feedback visivo immediato e disabilitando i bottoni per prevenire click multipli.
  * Invocare uno `startTimer()` per la gestione del countdown di 20 secondi.
  * Partenza di una funzione di supporto `handleTimeout()`, che scatta se il tempo a disposizione esaurisce o al click di una risposta. Ferma il timer, evidenziando la risposta corretta e utilizza un `setTimeout` per passare alla domanda successiva dopo un tempo prestabilito (`const FEEDBACK_DELAY = 1500;`).
* **`renderResults()`**: Invocata al termine del quiz. Calcola le percentuali finali e fa partire la libreria **Chart.js** per renderizzare un grafico a ciambella interattivo. Gestisce anche l'animazione fluida (`setInterval`) del numero percentuale a centro schermo. Vi è inoltre un bottone restart (`const restartButton`) che permette di ritornare alla schermata Welcome, per poter riprovare il quiz.
* **`renderFeedback()`** e **`renderThanksFeed()`**: Gestiscono il flusso finale post-quiz. Creano un'interfaccia interattiva a 5 stelle (dinamiche al passaggio del mouse e al click) e i campi di testo, portando infine l'utente alla schermata di ringraziamento.

---

## Funzionalità nel Dettaglio
L'applicazione integra accorgimenti specifici per ottimizzare l'esperienza utente ed evitare i bug tipici del DOM:
- Disabilita bottone
-
-
-
-

---

## Possibili Migliorie TU
Per futuri cicli di sviluppo, sono state identificate le seguenti ottimizzazioni:

- Local storage per salvare feedback e risultati
- Tentativi massimi (ad es. 3)
- 
-
-