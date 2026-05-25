/*
  REGOLE
  - Codice in JavaScript moderno: solo const/let, mai var.
  - DOM: usa querySelector / querySelectorAll.
  - Eventi: usa addEventListener (mai onclick inline nell'HTML).
  - Pattern: stato → render → eventi.
*/

/*
  Array di domande.
  Ogni question è un object con:
   - question: testo della domanda
   - correct_answer: la risposta corretta (string)
   - incorrect_answers: array di risposte sbagliate (string[])
*/

const QUESTIONS = [
  {
    question: "Cosa significa l'acronimo CPU?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    question:
      "In Java, quale keyword si usa per impedire che una variabile venga modificata?",
    correct_answer: "final",
    incorrect_answers: ["static", "private", "public"],
  },
  {
    question: "Il logo di Snapchat è una campana.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question:
      "I puntatori sono stati introdotti in C++ e non c'erano nel linguaggio C originale.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question:
      "Qual è il formato immagine più usato per i loghi nel database di Wikimedia?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    question: "Cosa significa l'acronimo CSS?",
    correct_answer: "Cascading Style Sheets",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheets",
      "Computer Style Sheets",
    ],
  },
  {
    question: "Qual è il nome in codice del sistema operativo Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    question: "Qual era il limite originale di caratteri di un Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    question: "Linux è stato creato come alternativa a Windows XP.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question:
      "Quale linguaggio di programmazione condivide il nome con un'isola dell'Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
  {
    question: "Qual è la celebre frase di Nils Liedholm?",
    correct_answer: "in 10 si gioca meglio",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

/* Costanti del quiz */
const TOTAL_QUESTIONS = QUESTIONS.length;
const PASS_THRESHOLD = 60; // percentuale minima per "Promosso"
const FEEDBACK_DELAY = 1500; // ms di attesa dopo risposta prima di avanzare
const TIMER_DURATION = 20; // secondi per ogni domanda

/* Stato globale */
let currentScreen = "welcome"; // "welcome" | "quiz" | "results"
let currentQuestion = 0;
let score = 0;
let timerId = null;

console.log(timerId);

/* SCRIVI QUI LE TUE FUNZIONI:
   - render() che chiama renderWelcome / renderQuiz / renderResults in base a currentScreen
   - renderWelcome() per la schermata iniziale con button Inizia
   - renderQuiz() per la domanda corrente con i button risposta + counter + timer
   - renderResults() per la schermata finale con percentuale + barre + verdetto
   - startTimer() / stopTimer() per il countdown
   - handleAnswer(button, answer) per il click su una risposta
   - handleTimeUp() per il tempo scaduto
   - advance() per andare alla domanda successiva o ai risultati
*/

const app = document.querySelector("#app");

const renderWelcome = () => {
  app.innerHTML = `<div class= "benvenuto">
<h2>Benvenuto al tuo esame</h2>

<p>Una serie di 10 domande sul 
mondo dell'informatica e del web.
 Per ogni domanda hai 20 secondi di tempo.</p>
<ul>
<li>in 10 si gioca meglio</li>
<li>Una volta cliccata una risposta, la domanda è chiusa.</li>
<li>Il quiz dura circa 3 minuti.</li>
</ul>
<button id="buttonStart">Inizia</button>
</div>`;
};

renderWelcome();

const startButton = document.getElementById("buttonStart");

startButton.addEventListener("click", function () {
  const FEEDBACK_DELAY = 1500;
  return renderQuiz();
});

/*const renderQuiz = () => {
  app.innerHTML = `<div class= "domanda">
  
  <h5>Domanda 3 di 10</h5>

  
  </div>
  
  
  <div class= "quiz">
  <h4>Il logo di Snapchat è una campana.</h4>
  <div class= "risposte">
  <p>Falso</p>
  <p>Vero</p>
  </div>
</div>`;
}; */
const renderResults = () => {
  app.innerHTML = `<div class= "results">
  
  <h3>Risultati</h3>
  <p class="completamento">Hai completato il quiz.</p>
  <br>
  <br>
  <p class="percentuale">70%</p>
  <br>
  <br>
  <p class="promosso">Promosso</p> 
  <br>
  <br>
  <br>
  <br>
  <div class="progresso">
  Corrette<div class="progressBarSopra"></div>7/10
  </div>
  <br>
  <div class="progresso">
  Sbagliate <div class="progressBarSotto"></div>3/10
  </div>
  <div> 
  <button id="buttonRestart">Ricomincia</button>
  </div>
  </div>`; //percentuale e promosso , da collegare a js promosso e bocciato
};
renderResults()