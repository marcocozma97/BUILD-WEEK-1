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
const suonoTick = new Audio("assets/sounds/tick2.wav"); //audio nel tick per un po di vitalita
const app = document.querySelector("#app"); //collega al main dell html

//SCHERMATA
//1 INIZIALE
//FUNZIONE WELCOME renderWelcome
//
//
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

  const startButton = document.getElementById("buttonStart");
  startButton.addEventListener("click", function () {
    renderQuiz(); //l'ascoltatore del bottone va messo dentro la funziione welcome perche
    //deve creare prima i bottoni fisici e poi dargli le funzioni interne
  });
};

//

const handleTimeout = () => {
  clearInterval(timerId);
  suonoTick.pause();
  const questionNow = QUESTIONS[currentQuestion];
  const buttonsAnswers = document.querySelectorAll(".btn-answer");
  // Disabilita tutti i bottoni e mostra la risposta corretta
  buttonsAnswers.forEach((button) => {
    button.disabled = true;
    if (button.innerText === questionNow.correct_answer) {
      button.classList.add("correct");
    }
  });
  // Passa alla domanda successiva dopo il delay

  
 setTimeout(() => {
    if (currentQuestion < QUESTIONS.length - 1) {
      currentQuestion++;
      renderQuiz();
    } else {
      renderResults();
    }
  }, FEEDBACK_DELAY);
};


//copio la mia funzione render css non ancora funzionante
// per vedere visivamente se incolla e fa funzionare il timer
let timeLeft = TIMER_DURATION; //dichiaro variabile non costante perche
//  con quella del prof che era una const javascript va in errore

//SCHERMATA
//2
//FUNZIONE TIMER startTimer
// (spostata prima di renderQuiz perche il browser deve
//  leggere la funzione prima di richiamarla da qualche parte)
//

const startTimer = () => {
  //creo funzione timer

  clearInterval(timerId); //IMPORTANTE : pulisco sempre la funzione all inizio per evitare che abbia problemi o
  // accavallamenti ogni volta che la si richiama in una domanda nuova
  // , all inizio del quiz etc
  timeLeft = TIMER_DURATION;
  const scegliTimer = document.querySelector("#timer"); //scelgo il timer nel mio html finto del js
  //che richiamo dentro al renderQuiz
  timerId = setInterval(() => {
    // creo arrowfunction per daegli un set interval
    timeLeft--; //gli dico di togliere 1 secondo ogni volta
    scegliTimer.innerText = timeLeft + "s"; //collega ad html e aggiungi s di secondi
    /*suonoTick.currentTime = 0; // fa ripartire il suono a ogni secondo
    suonoTick.play(); //da il suono del tick */
    if (timeLeft <= 5) {
      //se va sotto i 5 secondi
      scegliTimer.classList.add("timerRosso"); //allora dagli il css del timer rosso
    }

    if (timeLeft <= 0) {
      //se il timer raggiunge lo zero
      clearInterval(timerId); // allora pulisci e ferma il tempo
      suonoTick.pause(); //ferma il suono del tick prima del render finale
      handleTimeout(); //Chiamata alla gestione tempo scaduto
      //e portami alla schermata finale ( sara poi da cambiare con la funzione advance)
    }
  }, 1000); //gli do il mille per dirgli di ripetere il codice ogni secondo
};


//SCHERMATA
//3
//FUNZIONE QUIZ renderQuiz
//

const renderQuiz = () => {
  //incollato js quiz
  const questionNow = QUESTIONS[currentQuestion];

  const answersAll = [
    ...questionNow.incorrect_answers,
    questionNow.correct_answer,
  ];
  answersAll.sort(() => Math.random() - 0.5);
  const answersHTML = answersAll
    .map((risposta) => {
      return `<button class="btn-answer">${risposta}</button>`;
    })
    .join("");

  //incollato js quiz
  app.innerHTML = `<div class= "domanda">
  <span class= "question-counter">Domanda ${currentQuestion + 1} di ${QUESTIONS.length} </span>
<p id = "timer" class = "timerNero">20s</p>
   </div>
  <div class= "quiz">
  <h4>${questionNow.question}</h4>
  <div class= "risposte">${answersHTML}</div>
</div>`;

  const buttonsAnswers = document.querySelectorAll(".btn-answer");

  buttonsAnswers.forEach((bottone) => {
    bottone.addEventListener("click", function (event) {
      buttonsAnswers.forEach((b) => {
        b.disabled = true;
      });
      const clickedText = event.target.innerText;

      if (clickedText === questionNow.correct_answer) {
        event.target.classList.add("correct");
        score++;
      } else if (timeLeft === 0) {
        classList.add("correct");
      } else {
        event.target.classList.add("wrong");
        buttonsAnswers.forEach((button) => {
          if (button.innerText === questionNow.correct_answer) {
            button.classList.add("correct");
          }
        });
      }

      setTimeout(() => {
        if (currentQuestion < QUESTIONS.length - 1) {
          currentQuestion++;
          renderQuiz();
        } else {
          renderResults();
        }
      }, FEEDBACK_DELAY);
    });
  });


  //incollato js quiz
  startTimer(); //aggiungo il render dello startTimer qui
  // per darlo subito appena parte ogni domanda
};

renderWelcome(); //portami alla main

//SCHERMATA
//4
//FUNZIONE RISULTATI renderResults
//
//

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
renderWelcome(); //riavvio l'applicazione per caricare tutto ,
//  si mette in basso perche vogliamo assicurarci che il browser legga prima tutto
//  il contenuto di javascript e poi sia pronto ad esesguire le funzioni