const display = document.getElementById('display');
const buttons = document.querySelectorAll('[id*=tecla]');
const operators = document.querySelectorAll('[id*=operador]');

let newNumber = true;
let operator;
let previousNumber;

function updateDisplay(numero) {
    selOperator = false;

    if(newNumber) {
        display.textContent = numero;
        newNumber = false;
    }
    else display.textContent += numero;
}

const insertNumber = (event) => {
    updateDisplay(event.target.textContent);
}

// Prototype são atributos e funções inerentes ao tipo

buttons.forEach((button) => button.addEventListener('click', insertNumber));

const selectOperator = (event) => {
    selOperator = true;
    newNumber = true;
    operator = event.target.textContent;
    previousNumber = display.textContent;
}

operators.forEach((operator) => operator.addEventListener('click', selectOperator));

const calculate = () => {
    const actualNumber = display.textContent;
    const result = eval(`${previousNumber}${operator}${actualNumber}`); //template string, utilizando craze
    newNumber = true;
    updateDisplay(result);
}

const equal = document.querySelector("#igual");

equal.addEventListener('click', calculate);

const clearDisplay = () => (display.textContent = "");

document.querySelector("#limparDisplay").addEventListener("click", clearDisplay);

const clearCalc = () => {
  clearDisplay();
  newNumber = true;
  operator = undefined;
  previousNumber = undefined;
};

document.querySelector("#limparCalculo").addEventListener("click", clearCalc);

const removeLastNumber = () => 
    (display.textContent = display.textContent.slice(0,-1));

document.querySelector("#backspace").addEventListener("click", removeLastNumber);

const invertSignal = () => {
    newNumber = true;
    updateDisplay(display.textContent * -1);
}

document.querySelector("#inverter").addEventListener("click", invertSignal);

// inserir decimais
const insertDecimal = () => {
    newNumber = true;

// se nao houver numero, seta "0,"
    if (!display.textContent){ 
        updateDisplay(display.textContent + '0.');
    }

// nao permite adicionar mais que uma virgula
    if(!display.textContent.includes('.')) {
        updateDisplay(display.textContent + '.');
    }

// se nao houver numero apos operador, seta "0,"
    if (selOperator && newNumber){
        updateDisplay('0.');
    }
}

document.querySelector("#decimal").addEventListener("click", insertDecimal);