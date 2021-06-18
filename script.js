// The screen that the calculator is displayed on
var screen = document.getElementById('display')

// Initialize a bool for if the equal sign was just pressed
var finished = false

// Array of possible operators
var operators = ['+', '-', '*', '/']

function add(value) {
    // Add the value to the current equation
    let length = screen.value.length; 

    // Get the last value that was added
    let lastValue = screen.value[length - 1];

    // Variable to store if the last value was an operation
    let lastValueIsOperation = operators.includes(lastValue);

    // Check if equals was just pressed
    if (finished){
        screen.value = '';
        finished = false;
    }

    // Check if clear button was pressed
    if (value == 'C') {
        screen.value = '';
    }
    
    // Don't do anything if value is a decimal and the last number already has one
    else if ((value == '.' && !(decimalInNumber())) || value != '.') {
        if (value == '+' || value == '-' || value == '*' || value == '/') {
            if (lastValueIsOperation) { 
                // Replace the last operaton with the new one
                screen.value = screen.value.replace(/.$/, value);
            }
            else if (length != 0) {
                // Only add the operation if there is a number in the current equation
                screen.value += value;
            }
        }
        // Add a 0 before the decimal if there is no other number
        else if (value == '.' && (lastValueIsOperation || length == 0)) {
            screen.value += '0' + value;
        }
        // Check if a 0 is the first number, if it is then replace it with the new number
        else if (lastValue == '0' && (length == 1 || operators.includes(screen.value[length - 2]))){
            screen.value = screen.value.replace(/.$/, value);
        }
        else {
            screen.value += value;
        }
    } 
}

function decimalInNumber() {
    // Return true if a decimal already exists in the current number and false otherwise
    if (screen.value.length == 0) {
        return false
    }
    let currentIndex = screen.value.length - 1;
    while(currentIndex != 0) {
        // loop through the current value checking if a decimal exists
        let currentValue = screen.value[currentIndex]; 
        let currentValueIsOperation = currentValue == '+' || currentValue == '-' || currentValue == '*' || currentValue == '/'
        if (currentValueIsOperation) {
            // stop after reaching an operation
            break;
        }
        if (screen.value[currentIndex] == '.') {
            return true
        }
        currentIndex -= 1;
    }
    return false
}

function equals() {
    // Solve the current equation
    let result = eval(screen.value);

    // Check if a division by 0 happened since divison by 0 would give infinity
    if (!Number.isFinite(result)){
        // Show the error message and slowly make it fade out
        document.getElementById("error").style.opacity = 1;
        let fade = setInterval(function() {
            if (document.getElementById("error").style.opacity > 0){
                document.getElementById("error").style.opacity -= 0.04;
            }
            else{
                clearInterval(fade);
            }
        }, 200); 
        return
    }
    // If no divison by 0 then can change the value to the result
    screen.value = result;

    // Set finished to true to indicate equals was pressed
    finished = true;
}

function del() {
    // Remove the last thing that was inputted
    screen.value = screen.value.replace(/.$/, '');
}
