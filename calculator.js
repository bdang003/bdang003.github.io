const display = document.querySelector('#display');
const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));
numbers.forEach(element => element.addEventListener('click', enterNumber));
operators.forEach(element => element.addEventListener('click',operate));

let storedInputValue = ''; 
let currentInputValue = '';
let storedOperator = '';
let decimalUsed = false;


function operate(){
    if(this.innerHTML=='clear'){
        reset();
        updateDisplay(currentInputValue);
    }
    else{
        let operator = this.innerHTML;
        calculate(storedInputValue, parseFloat(currentInputValue), operator);
    }
    decimalUsed = false; //if an operator is used, currentInputValue gets a reset
}

function calculate(prevVal, currentVal, operator){
    console.log(`stored: ${prevVal} current: ${currentVal}`);
    if(operator!='='){ //does operation for +,-,×, and ÷. storedOperator allows for consecutive operations to be used
        if(!storedOperator){  //if this is the first operation used, it stores it for later use in case next action is another operation
            switch(operator){
                case '+':
                case '-':
                case '×':
                case '÷':
                    storedInputValue=Number(currentInputValue);
                    break;
            }
        }
        else if(storedOperator){
            switch(storedOperator){ //
                case '+':
                    storedInputValue=prevVal+currentVal;
                    break;
                case '-':
                    storedInputValue=prevVal-currentVal;
                    break;
                case '×':
                    storedInputValue=prevVal*currentVal;
                    break;
                case '÷':
                    storedInputValue=prevVal/currentVal;
                    break;
            }
        }
        storedOperator=operator; //saves operator for later usage
        currentInputValue = ''; //resets input value
        updateDisplay(storedInputValue);
    }
    else if(operator=='='){ //method for when operator is an '='
        calculate(Number(storedInputValue),Number(currentInputValue),storedOperator); //takes stored info and excutes
        reset(); //resets storedInputValue, storedOperator, currentInputValue, and decimal used
    }
}

function enterNumber(){ //changes currentInputValue based on user input (accounts for decimal as well)
    if(currentInputValue.length<15){
        if(currentInputValue == '0' && this.innerHTML != '.'){ //for first numerical value inputted
            currentInputValue = this.innerHTML;
        }
        else if(this.innerHTML !='.' || (this.innerHTML=='.' && !decimalUsed)){ //allows any numerical input or a decimal input when it has not been used
            currentInputValue += this.innerHTML; //attaches user input to currentInputValue
            if(this.innerHTML == '.') decimalUsed = true; //prevents user from using multiple decimals
        }
        updateDisplay(currentInputValue);    
    }
}

function reset(){ //resets all global variables to default
    storedInputValue = '';
    currentInputValue = ''; 
    storedOperator = '';
    decimalUsed = false;
}

function updateDisplay(num){ //changes display on calculator
    display.innerHTML=num;
    if(!num){ display.innerHTML = '0'} //changes empty string display to '0'
    console.log(`Stored: ${storedInputValue} Current: ${currentInputValue}`);
}
