var screen = document.getElementById('display')

function add(value)
{
    let lastValue = screen.value[screen.value.length - 1];
    let lastValueIsOperation = lastValue == '+' || lastValue == '-' || lastValue == '*' || lastValue == '/'
    if ((value == '.' && ! (decimalInNumber())) || value != '.')
    {
        if (value == '+' || value == '-' || value == '*' || value == '/')
        {
            if (lastValueIsOperation)
            { 
                screen.value = screen.value.replace(/.$/, value);
            }
            else if (screen.value.length != 0)
            {
                screen.value += value;
            }
        }
        else if (value == '.' && (lastValueIsOperation || screen.value.length == 0))
        {
            screen.value += '0' + value;
        }
        else 
        {
            screen.value += value;
        }
    } 
    if (value == 'C')
    {
        screen.value = '';
    }
}

function equals() 
{
    screen.value = eval(screen.value);
}

function del()
{
    screen.value = screen.value.replace(/.$/, '');
}

function decimalInNumber()
{
    if (screen.value.length == 0) {
        return false
    }
    let currentIndex = screen.value.length - 1;
    while(currentIndex != 0)
    {
        let currentValue = screen.value[currentIndex]; 
        let currentValueIsOperation = currentValue == '+' || currentValue == '-' || currentValue == '*' || currentValue == '/'
        if (currentValueIsOperation)
        {
            break;
        }
        if (screen.value[currentIndex] == '.') 
        {
            return true
        }
        currentIndex -= 1;
    }
    return false
}