// The screen that the calculator is displayed on
var screen = document.getElementById('display')

function add(value) {
    // Add the value to the current equation

    let lastValue = screen.value[screen.value.length - 1];
    let lastValueIsOperation = lastValue == '+' || lastValue == '-' || lastValue == '*' || lastValue == '/'

    // don't do anything if value is a decimal and the last number already has one
    if ((value == '.' && ! (decimalInNumber())) || value != '.') {
        if (value == '+' || value == '-' || value == '*' || value == '/') {
            if (lastValueIsOperation) { 
                // replace the last operaton with the new one
                screen.value = screen.value.replace(/.$/, value);
            }
            else if (screen.value.length != 0) {
                // Only add the operation if there is a number in the current equation
                screen.value += value;
            }
        }
        else if (value == '.' && (lastValueIsOperation || screen.value.length == 0)) {
            // Add a 0 before the decimal if there is no other number
            screen.value += '0' + value;
        }
        else {
            screen.value += value;
        }
    } 
    if (value == 'C') {
        screen.value = '';
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

    screen.value = eval(screen.value);
}

function del() {
    // Remove the last thing that was inputted

    screen.value = screen.value.replace(/.$/, '');
}
