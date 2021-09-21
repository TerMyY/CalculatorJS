'use strict'

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const allClearButton = document.querySelector('[data-allClear]')
const previousLabel = document.querySelector('[data-previous]')
const currentLabel = document.querySelector('[data-current]')

class Calculator
{
    constructor(previousLabel, currentLabel)
    {
        this.previousLabel = previousLabel
        this.currentLabel = currentLabel
        this.allClear()
    }

    allClear()
    {
        this.previous = ''
        this.current = ''
        this.operator = null
    }

    clear()
    {
        this.current = this.current.toString().slice(0, -1)
    }

    appendNumber(number)
    {
        if(number === '.' && this.current.toString().includes('.')) return
        this.current += number.toString()
    }

    chooseOperator(operator)
    {
        if (this.current === '') return
        if (this.previous !== '') this.calculate()
        this.operator = operator
        this.previous = this.current.toString() + operator.toString()
        this.current = ''
    }

    calculate()
    {
        let result
        const prev = parseFloat(this.previous)
        const curr = parseFloat(this.current)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operator)
        {
            case '+': result = prev + curr
            break
            case '-': result = prev - curr
            break
            case '×': result = prev * curr
            break
            case '÷': result = prev / curr
            break
            default: return
        }
        this.allClear()
        this.current = result
    }

    update()
    {
        this.previousLabel.innerText = this.previous
        this.currentLabel.innerText = this.current
    }
}

const calculator = new Calculator(previousLabel, currentLabel)

numberButtons.forEach(button => 
    {
        button.addEventListener('click', () => 
        {
            calculator.appendNumber(button.innerText)
            calculator.update()
        }
    )              
    } 
)

operatorButtons.forEach(button => 
    {
        button.addEventListener('click', () => 
        {
            calculator.chooseOperator(button.innerText)
            calculator.update()
        }
    )              
    } 
)

equalsButton.addEventListener('click', button => 
    {
        calculator.calculate()
        calculator.update()
    }
)

allClearButton.addEventListener('click', button =>
    {
        calculator.allClear()
        calculator.update()
    }
)

clearButton.addEventListener('click', button =>
    {
        calculator.clear()
        calculator.update()
    }
)