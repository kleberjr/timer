// Normaliza o número para 2 dígitos, para termos
// o timer no formato DD:HH:MM:SS, por exemplo:
// 2:5:13:21 -> 02:05:13:21
function normalize(x) {
    if (x < 10) {
        x = '0' + x;
    }
    
    return x;
}

// VALIDAÇÃO DA DATA DIGITADA -----------------------------------------------
const form = document.getElementsByTagName('form')[0];
const dateInput = document.querySelector('.data');

form.addEventListener('submit', function() {
    const dateValue = dateInput.value;
    const dayValue = parseInt(dateValue.slice(0,2));
    const monthValue = parseInt(dateValue.slice(3,5));
    const yearValue = parseInt(dateValue.slice(6));

    const startDate = new Date();
    const endDate = new Date(`${monthValue}/${dayValue}/${yearValue}`); // Inversão necessária para a utilização dos métodos.
        
    // Verifica se:
    //      1. O input contém a quantidade certa de caracteres,
    //      2. O input não está vazio,
    //      3. O input não é inválido (datas passadas);
    if ((dateInput.validity.tooShort) || (dateInput.value === '') || ((endDate - startDate) <= 0)) {
        dateInput.className = 'data error';
        
        event.preventDefault(); 
    } else {
        // Esconde a entrada de dados e mostra o timer.   
        dateInput.className = 'data';
        form.style.display = 'none';
        timerWrapper.style.display = 'flex';

        startTimer(endDate);
        event.preventDefault();            
    }
})


// TIMER --------------------------------------------------------------------
const timerWrapper = document.querySelector('div#timer-wrapper');
const timerDaySpan = document.getElementsByTagName('span')[0];
const timerHoursSpan = document.getElementsByTagName('span')[1];
const timerMinutesSpan = document.getElementsByTagName('span')[2];
const timerSecondsSpan = document.getElementsByTagName('span')[3];

let interval;

function startTimer(endDate, timeLeft) {
    // Inicia o timer e armazena o valor de retorno para poder cancelá-lo
    // depois.
    interval = setInterval(function() {
        // Calcula, a cada 1s, a diferença entre o horário da data atual
        // e 00h00 da data digitada.
        
        const actualDate = new Date();

        const timeLeft = Math.abs(endDate - actualDate);     
        let sobra = 0;

        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)); 
        sobra = timeLeft % (1000 * 60 * 60 * 24);

        let hours = Math.floor(sobra / (1000 * 60 * 60));
        sobra = sobra % (1000 * 60 * 60);

        let minutes = Math.floor(sobra / (1000 * 60));
        sobra = sobra % (1000 * 60);

        let seconds = Math.round(sobra / (1000));

        days = normalize(days);
        hours = normalize(hours);
        minutes = normalize(minutes);
        seconds = normalize(seconds);

        timerDaySpan.innerHTML = days;
        timerHoursSpan.innerHTML = hours;
        timerMinutesSpan.innerHTML = minutes;
        timerSecondsSpan.innerHTML = seconds;
    }, 1000);
}

// REFRESH ------------------------------------------------------------------
const reiniciar = document.querySelector('button#reiniciar');

// Retorna à tela de input, desligando o display do timer.
// Para o timer e limpa os valores.
reiniciar.addEventListener('click', function() {
    timerWrapper.style.display = 'none';
    form.style.display = 'flex';

    timerDaySpan.innerHTML = '00';
    timerHoursSpan.innerHTML = '00';
    timerMinutesSpan.innerHTML = '00';
    timerSecondsSpan.innerHTML = '00';

    clearInterval(interval);
})