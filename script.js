// Getting the Key Pressed on the Calculator

const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.keys');
const display = document.querySelector('.screen')

// Calculate function
const calculate = (n1, operator, n2) => {
    let result = ''
    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2)
    }
    else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2)
    }
    else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2)
    }
    else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2)
    }
    return result;

}

// Getting the Key Events Clicked
keys.addEventListener('click', event=> {

    if (event.target.matches('button')){
        const previousKeyType = calculator.dataset.previousKeyType;
        const key = event.target;
        const action = key.dataset.action;
        const pressedKey = key.textContent;
        const displayNumber = display.textContent;
        // console.log(pressedKey)

        // Remove pressed key from all buttons
        Array.from(key.parentNode.children)
            .forEach(pressed => pressed.classList.remove('is-depressed'))
            // console.log(key)
        
        // Check if the current display is 0 or an operator
        if (!action) {
            // console.log(previousKeyType)
            if (displayNumber === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate'){
                display.textContent = pressedKey;
            } 
            else {
                display.textContent = displayNumber + pressedKey;
            }
            calculator.dataset.previousKeyType = 'number'
        }
        // When the decimal operator is pressed
        if (action === 'decimal') {
            if (!displayNumber.includes('.')){
                display.textContent = displayNumber + '.'
            } else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = '0.'
            }
            calculator.dataset.previousKeyType = 'decimal'            
        }

        // Evaluate the operator funtion 
        if (action === 'add' || action === 'multiply' || action === 'subtract' || action === 'divide') {
            const secondValue = displayNumber;
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator

            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
                const calcResult = calculate(firstValue, operator, secondValue)
                display.textContent = calcResult;
                console.log('firstValue', firstValue)
                console.log('operator', operator)
                console.log('secondValue', secondValue)
                console.log('calcResult',calcResult)

                // To continue to calculate with the last display
                calculator.dataset.firstValue = calcResult;
            } else {
                // No further calculation made on the result
                calculator.dataset.firstValue = displayNumber
            }
            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.operator = action;
        }
        
        if (action === 'clear') {
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
            } else {
                key.textContent = 'AC'
            }
            display.textContent = 0
            calculator.dataset.previousKeyType = 'clear'
        }

        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action= clear]')
            clearButton.textContent = 'CE'
        }
        
        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayNumber;

            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayNumber;
                    secondValue = calculator.dataset.modValue
                }
                display.textContent = calculate (firstValue, operator, secondValue)
            }
            // Set modValue attribute
            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'
        
        }
    }

    
})


