// Создаем распознаватель
var recognizer = new webkitSpeechRecognition();
var btn = document.getElementById('speecher');
var enter = document.getElementById('enter');

// Ставим опцию, чтобы распознавание началось ещё до того, как пользователь закончит говорить
recognizer.interimResults = true;

// Какой язык будем распознавать?
recognizer.lang = 'ru-Ru';

let getWords;

// Используем колбек для обработки результатов
recognizer.onresult = function (event) {
  var result = event.results[event.resultIndex];
  if (result.isFinal) {
    console.log('Вы сказали: ' + result[0].transcript);
    enter.value = result[0].transcript;
    btn.style.visibility = 'hidden';
    getWords = () => {
      window.speechSynthesis.cancel();
      return result[0].transcript;
    }
  } else {
    console.log('Промежуточный результат: ', result[0].transcript);
  }
  let arr = enter.value.split(' ');
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == '+') {
      return getSum(Number(arr[i - 1]), Number(arr[i + 1]));
    } else if (arr[i] == '-') {
      return getDiff(Number(arr[i -1]), Number(arr[i + 1]))
    } else if (arr[i] == 'x') {
      return getMult(Number(arr[i - 1]), Number(arr[i + 1]))
    } else if (arr[i] == '/') {
      return getDiv(Number(arr[i - 1]), Number(arr[i + 1]))
    }
  }
};

// калькулятор отвечает что просили посчитать 
function getAnswer(a) {
  window.speechSynthesis.cancel();
  return speechSynthesis.speak(new SpeechSynthesisUtterance(`Вы просили посчитать ${getWords()} это равно ${a}`));
}


// математические операции
function getSum(a, b) {
  return getAnswer(enter.value = a + b);
}

function getDiff(a, b) {
  return getAnswer(enter.value = a - b);
}

function getMult(a, b) {
  return getAnswer(enter.value = a * b);
}

function getDiv(a, b) {
  return getAnswer(enter.value = a / b);
}


// блок для ошибок обработки
function speech () {
  btn.style.visibility = 'visible';
  try {
    recognizer.start();
  } catch (err) {
    console.log(err.name);
    console.log(err.message);
    console.log(err.stack);
  }
}

  // ручной набор чисел с проговариванием
  blockNumber.addEventListener('click', e => {
    window.speechSynthesis.cancel();
    let number = e.target.getAttribute('data-number');
    speechSynthesis.speak(new SpeechSynthesisUtterance(number))
    enter.value += number;
  });


  
  function stop () {
    btn.style.visibility = 'hidden';
    synth.pause();
  }

var synth = window.speechSynthesis;
var utterance = new SpeechSynthesisUtterance('How about we say this now? This is quite a long sentence to say.');


// проговорить результат по числу
blockOperation.addEventListener('click', e => {
  window.speechSynthesis.cancel();
  if (e.target.getAttribute('data-operation') == '=') {
    let text = enter.value.split('');
    console.log(text);
    for (let i = 0; i <= text.length; i++) {
      speechSynthesis.speak(new SpeechSynthesisUtterance(text[i]))
    }
  } else {
    speechSynthesis.speak(new SpeechSynthesisUtterance(e.target.getAttribute('data-name')))
  }
  enter.value += e.target.getAttribute('data-operation')
})








