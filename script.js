// Database of Questions (Reem's Questions integrated into Menna's structure)
const quizDatabase = {
  Programming: [
      { question: "Which language runs in a web browser?", options: ["Java", "C", "Python", "JavaScript"], correct: 3 },
      { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks Text Mark Language", "Home Tool Markup Language"], correct: 0 },
      { question: "Which keyword is used to declare a variable in JS?", options: ["var", "let", "const", "All of the above"], correct: 3 },
      { question: "What symbol is used for single-line comments in JavaScript?", options: ["//", "/*", "<!--", "#"], correct: 0 },
      { question: "Which CSS property is used to change background color?", options: ["color", "bgColor", "background-color", "canvas-color"], correct: 2 },
      { question: "How do you create a function in JavaScript?", options: ["function myFunction()", "function:myFunction()", "create myFunction()", "def myFunction()"], correct: 0 },
      { question: "Which symbol is used for strict equality in JavaScript?", options: ["==", "=", "===", "=="], correct: 2 },
      { question: "What data structure operates in First-In-First-Out (FIFO)?", options: ["Stack", "Queue", "Tree", "Graph"], correct: 1 },
      { question: "Which HTML element contains JavaScript code?", options: ["<script>", "<js>", "<javascript>", "<code_js>"], correct: 0 },
      { question: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], correct: 1 }
  ],
  Math: [
      { question: "What is the derivative of x²?", options: ["x", "2x", "x³ / 3", "2"], correct: 1 },
      { question: "What is the value of π (Pi) to two decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], correct: 1 },
      { question: "Solve for x: 2x + 5 = 15", options: ["5", "10", "2.5", "7.5"], correct: 0 },
      { question: "What is the square root of 144?", options: ["10", "11", "12", "14"], correct: 2 },
      { question: "What is cos(0°)?", options: ["0", "1", "-1", "0.5"], correct: 1 },
      { question: "If a triangle has sides 3 and 4, what is the hypotenuse?", options: ["5", "6", "7", "25"], correct: 0 },
      { question: "What is 7 factorial (7!)?", options: ["5040", "720", "120", "40320"], correct: 0 },
      { question: "What is log10(1000)?", options: ["1", "2", "3", "4"], correct: 2 },
      { question: "Sum of interior angles of a triangle is:", options: ["90°", "180°", "270°", "360°"], correct: 1 },
      { question: "What is 2⁵?", options: ["10", "16", "32", "64"], correct: 2 }
  ],
  Physics: [
      { question: "What is the SI unit of force?", options: ["Joule", "Watt", "Newton", "Pascal"], correct: 2 },
      { question: "What is the acceleration due to gravity on Earth (approx)?", options: ["9.8 m/s²", "8.9 m/s²", "10.5 m/s²", "6.2 m/s²"], correct: 0 },
      { question: "Formula for Ohm's Law:", options: ["V = IR", "P = IV", "F = ma", "E = mc²"], correct: 0 },
      { question: "Speed of light in vacuum is approximately:", options: ["3 x 10⁸ m/s", "3 x 10⁶ m/s", "1.5 x 10⁸ m/s", "300,000 m/s"], correct: 0 },
      { question: "Unit of electrical resistance is:", options: ["Volt", "Ampere", "Ohm", "Watt"], correct: 2 },
      { question: "Which law states 'For every action, there is an equal and opposite reaction'?", options: ["Newton's 1st Law", "Newton's 2nd Law", "Newton's 3rd Law", "Law of Gravitation"], correct: 2 },
      { question: "Kinetic energy formula:", options: ["mgh", "1/2 mv²", "mv", "Fd"], correct: 1 },
      { question: "Which device converts mechanical energy into electrical energy?", options: ["Motor", "Generator", "Transformer", "Battery"], correct: 1 },
      { question: "What particle has a negative charge?", options: ["Proton", "Neutron", "Electron", "Photon"], correct: 2 },
      { question: "What is the unit of power?", options: ["Joule", "Watt", "Newton", "Volt"], correct: 1 }
  ],
  Biology: [
      { question: "What is known as the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi Apparatus"], correct: 2 },
      { question: "DNA stands for:", options: ["Deoxyribonucleic Acid", "Ribonucleic Acid", "Dioxy-Nitrogen Acid", "Dual Nucleic Acid"], correct: 0 },
      { question: "Which pigment gives plants their green color?", options: ["Carotene", "Chlorophyll", "Hemoglobin", "Melanin"], correct: 1 },
      { question: "How many chromosomes do human somatic cells have?", options: ["23", "46", "44", "48"], correct: 1 },
      { question: "Process by which plants make their own food:", options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"], correct: 1 },
      { question: "Which gas do humans inhale for survival?", options: ["Carbon Dioxide", "Nitrogen", "Oxygen", "Hydrogen"], correct: 2 },
      { question: "What is the largest organ in the human body?", options: ["Liver", "Brain", "Heart", "Skin"], correct: 3 },
      { question: "Which blood type is considered the universal donor?", options: ["A+", "B-", "O-", "AB+"], correct: 2 },
      { question: "Basic structural and functional unit of life:", options: ["Tissue", "Organ", "Cell", "Atom"], correct: 2 },
      { question: "Which system controls body activities using electrical signals?", options: ["Nervous System", "Digestive System", "Circulatory System", "Respiratory System"], correct: 0 }
  ]
};

// Global State Variables
let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let timerInterval = null;
let timeLeft = 600; // 10 Minutes in seconds

// Screen Switching Function
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

// Start Quiz
function startQuiz(type) {
  // Use the selected subject, default to Programming if not found
  currentQuestions = quizDatabase[type] || quizDatabase['Programming'];
  document.getElementById('exam-title').innerText = `${type} Exam`;
  
  currentQuestionIndex = 0;
  userAnswers = new Array(currentQuestions.length).fill(null);
  timeLeft = 600; // 10 minutes reset
  
  showScreen('quiz-screen');
  startTimer();
  renderQuestion();
}

// Timer Logic
function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    
    document.getElementById('timer-display').innerText = 
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }
  }, 1000);
}

// Render Current Question
function renderQuestion() {
  const q = currentQuestions[currentQuestionIndex];
  
  document.getElementById('question-number').innerText = `Question: ${currentQuestionIndex + 1}`;
  document.getElementById('question-text').innerText = q.question;

  // Update Progress Bar
  const progressPercent = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
  document.getElementById('progress-bar').style.width = `${progressPercent}%`;

  // Render Options
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';

  q.options.forEach((optionText, idx) => {
    const isSelected = userAnswers[currentQuestionIndex] === idx;
    const col = document.createElement('div');
    col.className = 'col-6 text-center';
    col.innerHTML = `
      <button class="pill-btn ${isSelected ? 'selected' : ''}" onclick="selectOption(${idx})">
        ${optionText}
      </button>
    `;
    optionsContainer.appendChild(col);
  });

  // Update Navigation Controls
  document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
  document.getElementById('next-btn').disabled = currentQuestionIndex === currentQuestions.length - 1;

  // Toggle Save / Submit on the final question
  if (currentQuestionIndex === currentQuestions.length - 1) {
    document.getElementById('save-btn').classList.add('d-none');
    document.getElementById('submit-btn').classList.remove('d-none');
  } else {
    document.getElementById('save-btn').classList.remove('d-none');
    document.getElementById('submit-btn').classList.add('d-none');
  }
}

// Option Click Handler
function selectOption(index) {
  userAnswers[currentQuestionIndex] = index;
  renderQuestion();
}

// Save & Next Button
function saveAnswer() {
  if (currentQuestionIndex < currentQuestions.length - 1) {
    navigateQuestion(1);
  }
}

// Next / Previous Navigation
function navigateQuestion(direction) {
  currentQuestionIndex += direction;
  renderQuestion();
}

// Submit Quiz & Show Result, Rank, and Correct Answers
function submitQuiz() {
  clearInterval(timerInterval);
  
  let score = 0;
  let resultDetailsHTML = '<h4 class="mt-4 mb-3" style="color: #0b2238; font-weight:bold;">Review Answers:</h4><div class="results-list" style="max-height: 250px; overflow-y: auto; text-align: left; direction: ltr; font-size: 0.9rem;">';

  // 1. Calculate score and prepare answers display
  userAnswers.forEach((ans, idx) => {
    const q = currentQuestions[idx];
    const isCorrect = ans === q.correct;
    if (isCorrect) score++;

    const userChoiceText = ans !== null ? q.options[ans] : "Not Answered";
    const correctChoiceText = q.options[q.correct];

    // Style correct or incorrect answer block
    resultDetailsHTML += `
      <div class="result-item mb-2 p-2 rounded" style="border: 1px solid #ccc; background: ${isCorrect ? '#d4edda' : '#f8d7da'}; color: #333;">
        <div class="fw-bold">${idx + 1}. ${q.question}</div>
        <div>Your Answer: <span style="color: ${isCorrect ? 'green' : 'red'}; font-weight: bold;">${userChoiceText}</span></div>
        ${!isCorrect ? `<div>Correct Answer: <span style="color: green; font-weight: bold;">${correctChoiceText}</span></div>` : ''}
      </div>
    `;
  });
  resultDetailsHTML += '</div>';

  // 2. Logic for saving scores and calculating rank based on localStorage data
  let rankMessage = "";
  const users = JSON.parse(localStorage.getItem('logix_users')) || [];
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const currentExamName = document.getElementById('exam-title').innerText.split(' ')[0]; // Example: "Programming"

  if (currentUser) {
      // Update or add grade in current user's data
      if (!currentUser.grades) currentUser.grades = [];
      const existingGradeIndex = currentUser.grades.findIndex(g => g.examName === currentExamName);
      
      if(existingGradeIndex !== -1) {
          currentUser.grades[existingGradeIndex].score = score; // Update score if exam was taken before
      } else {
          currentUser.grades.push({ examName: currentExamName, score: score }); // Add new exam score
      }
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      // Update user data in the main users list
      const userIndex = users.findIndex(u => u.email === currentUser.email);
      if(userIndex !== -1) {
          users[userIndex] = currentUser;
          localStorage.setItem('logix_users', JSON.stringify(users));
      }

      // Calculate Rank
      let allScoresForExam = [];
      users.forEach(u => {
          if (u.grades) {
              const gradeObj = u.grades.find(g => g.examName === currentExamName);
              if(gradeObj) allScoresForExam.push(gradeObj.score);
          }
      });

      // Sort scores in descending order to determine rank
      allScoresForExam.sort((a, b) => b - a);
      const userRank = allScoresForExam.indexOf(score) + 1;
      
      rankMessage = `
        <div class="alert alert-info mt-3 fw-bold" style="background-color: #0b2238; color: white; border: none;">
            🏆 Your Rank: <strong>#${userRank}</strong> out of <strong>${allScoresForExam.length}</strong> students.
        </div>
      `;
  } else {
      rankMessage = `<div class="alert alert-danger mt-3">Please login to save your score and view your rank.</div>`;
  }

  // 3. Display final result to the user
  document.getElementById('score-text').innerText = `${score} / ${currentQuestions.length}`;
  document.getElementById('result-feedback').innerHTML = rankMessage + resultDetailsHTML;
  
  showScreen('result-screen');
}