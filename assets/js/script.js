/*
  REGOLE
  - Codice in JavaScript moderno: solo const/let, mai var.
  - DOM: usa querySelector / querySelectorAll.
  - Eventi: usa addEventListener (mai onclick inline nell'HTML).
  - Pattern: stato → render → eventi.
*/


/* ARRAY MODIFICATO DIVERTENTE */

const QUESTIONS = [
  {
    question: "In azienda, la consegna del progetto è sempre:",
    correct_answer: "Ieri",
    incorrect_answers: [
      "Il prima possibile",
      "Entro venerdì",
      "A fine mese",
    ],
  },
  {
    question:
      "Quali sono i nomi di personaggi più utilizzati nel linguaggio JavaScript?",
    correct_answer: "Pippo, Pluto, Paperino",
    incorrect_answers: ["Qui, Quo, Qua", "Braccio di Ferro, Olivia, Bruto", "Mr.Incredible ,Elastigirl , Flash"],
  },
  {
    question: "Quali sono i peggiori nemici dello sviluppatore?",
    correct_answer: "Le altre sono tutte corrette",
    incorrect_answers: ["I colleghi a cui non piace lavorare in team", "L' AI soprattutto se Chat GPT", "Il MacBook se utilizzato per sviluppare"],
  },
  {
    question:
      "A cosa serve il corso in Full Stack Development",
    correct_answer: "Ad imparare come utilizzare Git e GitHub",
    incorrect_answers: ["Ad imparare come scrivere e gestire il codice"],
  },
  {
    question:
      "Cosa speri che ti dia la vita?",
    correct_answer: "Che mi insegni a pescare",
    incorrect_answers: ["Che mi dia un pesce"],
  },
  {
    question: "Se chiedi all' AI la biografia di Manzoni come ti risponde?",
    correct_answer: "Mi dà come risultato la biografia di Alessandro Manzoni perfetta per un ragazzo delle scuole medie.",
    incorrect_answers: ["Mi dà come risultato la biografia di Piero Manzoni, uno dei più grandi, ironici e famosi artisti concettuali del Novecento.",],
  },
  {
    question: "Qual è il nome in codice del sistema operativo Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["È una domanda, si accettano risposte", "Jelly Bean", "Marshmallow"],
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
    question: "Linux è stato creato come alternativa a Windows XP.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question: "Qual è la celebre frase di Nils Liedholm?",
    correct_answer: "In 10 si gioca meglio",
    incorrect_answers: ["Python è il miglior linguaggio", "C è molto complesso", "Un giorno andrò a Jakarta"],
  },
];


/* ARRAY INIZIALE SERIO */
/*
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
];
*/

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


let shuffledQuestions = [];
const suonoTick = new Audio("assets/sounds/tick2.wav"); //audio nel tick per un po di vitalita
const app = document.querySelector("#app"); //collega al main dell html
const shuffleQuestions = () => {
  shuffledQuestions = [...QUESTIONS].sort(() => Math.random() - 0.5);
};

/* SCHERMATA DI BENVENUTO, RENDER WELCOME */

const renderWelcome = () => {
  app.innerHTML = 
`<div class= "welcome">
  <h2>Benvenuto al tuo esame</h2>
  <p>Una serie di 10 domande sul mondo dell'informatica e del web. Per ogni domanda hai 20 secondi di tempo.</p>
  <ul>
    <li>Ogni domanda è a tempo e puoi ricevere una sola risposta</li>
    <li>Una volta cliccata una risposta, la domanda è chiusa.</li>
    <li>Il quiz dura circa 3 minuti.</li>
  </ul>
  <button id="buttonStart">Inizia</button>
</div>`;

/* BOTTONE DI INIZIO QUIZ */

  const startButton = document.getElementById("buttonStart");
  startButton.addEventListener("click", function () {
    currentQuestion = 0;
    score = 0;
    shuffleQuestions();
    renderQuiz(); //l'ascoltatore del bottone va messo dentro la funziione welcome perche
    //deve creare prima i bottoni fisici e poi dargli le funzioni interne
  });
};

/* FUNZIONE CHE GESTISCE CIò CHE ACCADE A TEMPO SCAUDUTO */

const handleTimeout = () => {
  clearInterval(timerId);
  suonoTick.pause();
  const questionNow = shuffledQuestions[currentQuestion];
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

let timeLeft = TIMER_DURATION; //dichiaro variabile non costante 

/* FUNZIONE TIMER */

const startTimer = () => {
  //creo funzione timer

  clearInterval(timerId); //IMPORTANTE : pulisco sempre la funzione all inizio per evitare che abbia problemi quando si richiama
  timeLeft = TIMER_DURATION;
  const scegliTimer = document.querySelector("#timer"); //scelgo il timer nel mio html finto del js
  //che richiamo dentro al renderQuiz
  timerId = setInterval(() => {
    // creo arrowfunction per dargli un set interval
    timeLeft--;
    scegliTimer.innerText = timeLeft + "s"; //collega ad html e aggiungi s di secondi
    if (timeLeft <= 5) {
      scegliTimer.classList.add("red-timer"); //Se il tempo è a 5 sec o meno allora "CSS red-timer"
    }

    if (timeLeft <= 0) {
      //se il timer raggiunge lo zero
      clearInterval(timerId); // allora pulisci e ferma il tempo
      handleTimeout(); //Chiamata alla gestione tempo scaduto
    }
  }, 1000);
};

/* SCHERMATA DEL QUIZ, RENDER QUIZ */

const renderQuiz = () => {
  const questionNow = shuffledQuestions[currentQuestion];

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

    /* HTML DEL QUIZ */
  
  app.innerHTML = 
`<div class= "quiz-container">
    <span class= "question-counter">Domanda ${currentQuestion + 1} di ${QUESTIONS.length} </span>
    <p id = "timer" class = "black-timer">20s</p>
   </div>
    <div class= "quiz">
    <h4>${questionNow.question}</h4>
    <div class= "answers">${answersHTML}</div>
</div>`;

/* FUNZIONE CLICK "CORRETTO", "SBAGLIATO", DISABILITATO */

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
/* CHECK NUMERO DOMANDA -> ALLA SUCCESSIVA MA SE FINITO RENDER RESULTS */
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
  startTimer(); //aggiungo il render dello startTimer
};



/* SCHERMATA DEI RISULTATI, RENDER RESULTS */

/* Funzione Promosso/Bocciato */

const graduation = () => {
  if (score >= 6) {
    return `<p class="passed">Promosso</p>`;
  } else {
    return `<p class="failed">Bocciato</p>`;
  }
};

/* Variabili dichiarate */

let resultChart = null;
// IL COMPONENT DEI RISULTATI CORRETTO
const renderResults = () => {
  clearInterval(timerId);
  const totalQ = QUESTIONS.length;
  const wrongAnswers = totalQ - score;

  const percentageWright = totalQ > 0 ? (score / totalQ) * 100 : 0;
  const percentageWrong = 100 - percentageWright;
  const percentageTotal = 100;

  const haSuperato = percentageWright >= PASS_THRESHOLD;
  const verdettoTesto = haSuperato ? "Superato!" : "Fallito!";
  const verdettoClasse = haSuperato ? "text-passed" : "text-failed";

/* HTML Sezione Results */

  app.innerHTML = `
    <div class="results-container">
      <h2 class="results-title">Risultati</h2>
      <p class="complete-quiz">Hai completato il quiz.</p>

      <!-- Grafico a ciambella -->
      <div class="chart-wrapper">
        <canvas id="resultChart"></canvas>
        <div class="chart-center-text">
          <span class="center-verdict ${verdettoClasse}">${verdettoTesto}</span>
          <strong id="animatedPercentage">0%</strong>
          <span class="center-sub">${score}/${totalQ} domande</span>
        </div>
      </div>

      <!-- Barra orizzontale con bottoni (CORRETTA E CHIUSA) -->
      <div class="summary-container-horizontal">
        <div class="summary-box">
          <div class="box-stat">
            <span class="num-green">${score}</span>
            <span class="lbl-stat">Corrette</span>
          </div>
          <div class="box-stat">
            <span class="num-red">${wrongAnswers}</span>
            <span class="lbl-stat">Sbagliate</span>
          </div>
          <div class="box-stat">
            <span class="num-blue">${totalQ}</span>
            <span class="lbl-stat">Totali</span>
          </div>
        </div>
        <button id="buttonRestart">↻ Ricomincia</button>
      </div>

      <!-- parte 3 -->
      <p class="feedback-invite">Puoi fare il quiz quante volte vuoi.</p>
      
      <div class="error-warning">
        ⚠️ Le domande del quiz possono contenere errori. In caso di errori sei pregato di segnalarci l'errore!
      </div>
        <button id="button-gofeedback">Vai avanti</button>
    </div>
  `;

 /* CHART JS, Grafico a torta */
  const ctx = document.getElementById("resultChart").getContext("2d");

  if (resultChart !== null) {
    resultChart.destroy();
  }

  // Valori d'appoggio anti-crash se lo score è 0
  const chartValues =
    percentageWright === 0 ? [0.01, 99.99] : [score, wrongAnswers];

  resultChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Corrette", "Sbagliate"],
      datasets: [
        {
          data: chartValues,
          backgroundColor: ["#2ed573", "#ff4757"],
          cutout: "82%",
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
    },
  });

  // 4. ANIMAZIONE NUMERO PERCENTUALE STABILE (Senza bug hover)
  const elementoPercentuale = document.getElementById("animatedPercentage");
  let contoIniziale = 0;
  const targetPercentage = Math.round(percentageWright);

  if (targetPercentage > 0) {
    const intervalloNumero = setInterval(() => {
      contoIniziale++;
      elementoPercentuale.innerText = contoIniziale + "%";
      if (contoIniziale >= targetPercentage) {
        clearInterval(intervalloNumero);
      }
    }, 12);
  } else {
    elementoPercentuale.innerText = "0%";
  }

  // 5. EVENTO CLICK SUL PULSANTE RICOMINCIA
  const restartButton = document.getElementById("buttonRestart");
  restartButton.addEventListener("click", function () {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    renderWelcome();
  });

  /* BOTTONE VAI AVANTI (Nella sezione Feedback) */

  const goAhead = document.getElementById("button-gofeedback");
  goAhead.addEventListener("click", function () {
    renderFeedback();
});
}

/* SCHERMATA DI FEEDBACL, RENDER FEEDBACK */

const renderFeedback = () => {

  app.innerHTML =  
  `<div class= "feedback">
    <h2 class="title-feed">Come valuteresti la tua esperienza complessiva?</h2>
     <div class="star-container">
      <div class="star"> 
        <button class="star-image" type="button" data-value="1">&#9734;</button>
        <span class="star-number">1</span>
        <span class="star-text">Pessima</span>
      </div> 

      <div class="star"> 
        <button class="star-image" type="button" data-value="2">&#9734</button>
        <span class="star-number">2</span>
        <span class="star-text">Scarsa</span>
      </div> 

      <div class="star"> 
        <button class="star-image" type="button" data-value="3">&#9734;</button>
        <span class="star-number">3</span>
        <span class="star-text">Neutra</span>
      </div> 

      <div class="star"> 
        <button class="star-image" type="button" data-value="4">&#9734;</button>
        <span class="star-number">4</span>
        <span class="star-text">Buona</span>
      </div> 

      <div class="star"> 
        <button class="star-image" type="button" data-value="5">&#9734;</button>
        <span class="star-number">5</span>
        <span class="star-text">Eccellente</span>
      </div> 
    </div>
  </div>
  
  <div class="what-liked">
    <label class="liked-label">Cosa ti è piaciuto di più?</label>
    <textarea id="liked-text" maxlength="500" placeholder=" Condividi qui i tuoi pensieri ..."></textarea>
    <div id="char-counter-liked"> max. 500 caratteri</div>          
  </div>

  <div class="what-advice">
    <label class="advice-label">Cosa possiamo migliorare?</label>
    <textarea id="advice-text" maxlength="500" placeholder=" I tuoi suggerimenti sono preziosi per noi ..."></textarea>
    <div id="char-counter-advice"> max. 500 caratteri</div>          
  </div>

  <div class="email">
    <label class="email-label">La tua email <span class="email-optional">(facoltativa)</span></label>
    <input type="email" id="email-text" placeholder="es. nome@mail.it"></input>     
  </div>


  <button id="submit-feed">Invia Feedback</button>
  `;

  /* 1. Logica delle stelle */

const stars = document.querySelectorAll('.star-image');
  let currentRating = 0;

  stars.forEach(star => {
    star.addEventListener('click', (e) => {
      // .closest garantisce che venga estratto il bottone anche se si tocca il testo interno
      const button = e.currentTarget.closest('.star-image');
      currentRating = +button.getAttribute('data-value');

      stars.forEach(s => {
        const starValue = +s.getAttribute('data-value');

        if (starValue <= currentRating) {
          s.innerHTML = '&#9733;'; // Cambia il testo in Stella Piena
          s.classList.add('active-star'); // Aggiunge la classe agganciata al CSS
        } else {
          s.innerHTML = '&#9734;'; // Ripristina Stella Vuota
          s.classList.remove('active-star'); // Rimuove la classe
        }
      });
    });
  });

/* BOTTONE PER ANDARE ALLA PAGINA CONCLUSIVA DI RINGRAZIAMENTI DOPO IL FEEDBACK */
  const sendFeedback = document.getElementById("submit-feed");
  sendFeedback.addEventListener("click", function () {
    renderThanksFeed();
  });
};

/* SCHERMATA RINGRAZIAMENTI DOPO IL FEEDBACK, rendereThanksFeed */

const renderThanksFeed = () => {
  app.innerHTML = `
  <h2 id="thanks-feed-title">🌟Grazie per il feedback!🌟</h2>
  <p class="goodbye">Il tuo contributo è prezioso. Usiamo le recensioni dei nostri studenti per rifinire le domande e rendere l'applicazione del quiz sempre migliore.</p>
  `;

}




renderWelcome();
//riavvio l'applicazione per caricare tutto ,
//  si mette in basso perche vogliamo assicurarci che il browser legga prima tutto
//  il contenuto di javascript e poi sia pronto ad esesguire le funzioni