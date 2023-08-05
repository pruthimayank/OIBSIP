let displayValue = '';
let operator = '';
let firstOperand = '';
let secondOperand = '';

function updateDisplay() {
    document.getElementById('output').innerHTML = displayValue;
}

function appendNumber(number) {
    displayValue += number;
    updateDisplay();
}

function appendOperator(op) {
    if (displayValue === '') return;
    if (operator !== '') {
        calculateResult();
    }
    operator = op;
    firstOperand = displayValue;
    displayValue = '';
}

function calculateResult() {
    if (operator === '' || firstOperand === '' || displayValue === '') return;
    secondOperand = displayValue;
    let result;
    switch (operator) {
        case '.':
            result = displayValue='.'
        case '+':
            result = parseFloat(firstOperand) + parseFloat(secondOperand);
            break;
        case '-':
            result = parseFloat(firstOperand) - parseFloat(secondOperand);
            break;
        case '*':
            result = parseFloat(firstOperand) * parseFloat(secondOperand);
            break;
        case '/':
            result = parseFloat(firstOperand) / parseFloat(secondOperand);
            break;
        case '%':
            result = parseFloat(firstOperand) / 100 * parseFloat(secondOperand);
            break;
        default:
            return;
    }
    displayValue = result.toString();
    operator = '';
    firstOperand = '';
    secondOperand = '';
    updateDisplay();
}

function toggleSign() {
    if (displayValue.startsWith("-")) {
      displayValue = displayValue.slice(1);
    } else {
      displayValue = "-" + displayValue;
    }
    updateDisplay();
 }

function addDecimal(op) {
    if (displayValue.endsWith(".")) {
      return;
    }
    displayValue += op;
    updateDisplay();
 }

function clearDisplay() {
    displayValue = '';
    operator = '';
    firstOperand = '';
    secondOperand = '';
    updateDisplay();
}

function deleteDigit() {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
}
