// Getting the Key Pressed on the Calculator

const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.keys');
const display = document.querySelector('.screen')


// Getting the Key Events Clicked
keys.addEventListener('click', event=> {

    if (event.target.matches('button')){
        const previousKeyType = calculator.dataset.previousKeyType;
        const key = event.target;
        const action = key.dataset.action;
        const pressedKey = key.textContent;
        const displayNumber = display.textContent;
        console.log(pressedKey)
        
        // Check if the current display is 0 or an operator
        if (!action) {
            if (displayNumber === '0' || previousKeyType === 'operator'){
                display.textContent = pressedKey

            } 
            // else if (previousKeyType === 'operator'){
            //     console.log('Operator pressed after number')
            //     display.textContent = pressedKey
            // }
            else {
                display.textContent = displayNumber + pressedKey;
            }
        }
        // Add a class to the list when operator is pressed
        if (action === 'add' || action === 'multiply' || action === 'subtract' || action === 'divide') {
            key.classList.add('is-pressed');
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = displayNumber;
            calculator.dataset.operator = action
        }




        // Remove pressed key from all buttons
        Array.from(key.parentNode.children)
            .forEach(pressed => pressed.classList.remove('is-pressed'))
            console.log(key)

        // Get Key pressed
        
        if (action === 'clear') {
            console.log(action)
        }

        if (action === 'decimal') {
            display.textContent = displayNumber + '.'
        }

        

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

        if (action === 'calculate') {
            
            const secondValue = displayNumber;
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            
            
            display.textContent = calculate(firstValue, operator, secondValue)
        } 

    }

    
})


