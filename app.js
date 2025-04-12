// app.js
import { saveResult } from './firebase.js';

let currentData = [];
const quizForm = document.getElementById('quizForm');
const resultDiv = document.getElementById('result');
const submitBtn = document.getElementById('submitBtn');

window.loadDe = async function () {
  const mon = document.getElementById("monHoc").value;
  const de = document.getElementById("deThi").value;
  const res = await fetch(`data/${mon}/${de}.json`);
  currentData = await res.json();
  quizForm.innerHTML = '';
  resultDiv.innerHTML = '';

  currentData.forEach((q, i) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p class="font-semibold">Câu ${i + 1}: ${q.question}</p>
      ${q.options.map((opt, j) => `
        <label class="block ml-4">
          <input type="radio" name="q${i}" value="${j}" required /> ${opt}
        </label>`).join('')}
    `;
    quizForm.appendChild(div);
  });
  submitBtn.classList.remove('hidden');
};

window.submitQuiz = function (e) {
  e.preventDefault();
  let score = 0;
  currentData.forEach((q, i) => {
    const selected = quizForm[`q${i}`].value;
    if (Number(selected) === q.answer) score++;
  });
  const name = prompt("Nhập tên của bạn:");
  const mon = document.getElementById("monHoc").value;
  resultDiv.innerHTML = `✅ Bạn được ${score}/${currentData.length} điểm.`;
  saveResult(mon, name, score, currentData.length);
};
