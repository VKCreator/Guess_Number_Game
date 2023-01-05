buttonInterval.addEventListener("click", prepareGame);
inputStartInterval.addEventListener("input", checkValueInterval);
inputFinishInterval.addEventListener("input", checkValueInterval);
inputUserNumber.addEventListener("input", checkUserValue);
buttonUserValue.addEventListener("click", compareValues);
buttonAgain.addEventListener("click", restartGame);


document.addEventListener('DOMContentLoaded', function(event) { 
    inputStart = document.getElementById('inputStartInterval')
    inputFinish = document.getElementById('inputFinishInterval')

    inputStart.value = 10;
    inputFinish.value = 100;
    inputUserNumber.value ="";
    inputStart.classList.add("is-valid")
    inputFinish.classList.add("is-valid")
    infoAboutMistake.hidden = true
});

function isNumber(val) 
{
    return val != "" && val % 1 == 0; // type="number"
}

function checkUserValue(event)
{
    let val = event.target.value

    if (!isNumber(val)) 
    {
       userNumberHelp.textContent = "Введите целое число!"
       event.target.classList.add("is-invalid")
       buttonUserValue.setAttribute("disabled","true")
    }
    else 
    {
        buttonUserValue.removeAttribute("disabled","")
        event.target.classList.remove("is-invalid")
        userNumberHelp.textContent = ""
    }

    let maxlength = 14
    if (val.length > maxlength) 
    {
        event.target.value = val.slice(0,maxlength); 
    }
}

function checkValueInterval(event)
{
    let messageDiv;
    if (event.target.id === "inputStartInterval")
        messageDiv = document.getElementById("startIntervalHelp")
    else
        messageDiv = document.getElementById("finishIntervalHelp")

    let itemValue = event.target.value
    infoAboutMistake.textContent = ""
    infoAboutMistake.hidden = true
    buttonInterval.removeAttribute("disabled")

    if (!isNumber(itemValue)) 
    {
       messageDiv.textContent = "Введите целое число!"
       event.target.classList.add("is-invalid")
       buttonInterval.setAttribute("disabled","true")
    }
    else 
    {
        messageDiv.textContent = ""
        event.target.classList.remove("is-invalid")
        event.target.classList.add("is-valid")

        let maxlength = 14
        if (itemValue.length > maxlength) 
        {
            event.target.value = itemValue.slice(0,maxlength); 
        }


        if (isNumber(inputFinishInterval.value) && isNumber(inputStartInterval.value)) 
        {
            let start = parseInt(inputStartInterval.value)
            let finish = parseInt(inputFinishInterval.value)
            let isMistake = false

            if (start === finish) 
            {
                isMistake = true
                infoAboutMistake.textContent = "Значения не могут быть равны!"
            }
            else if (start > finish) 
            {
                isMistake = true
                infoAboutMistake.textContent = "Поменяйте значения местами!"
            }

            if(isMistake) 
            {
                infoAboutMistake.hidden = false
                buttonInterval.setAttribute("disabled","true")
            }
        }
    }
}

function generateTimer(seconds) {
    infoAboutMistake.hidden = false
    inputStartInterval.setAttribute("disabled","")
    inputFinishInterval.setAttribute("disabled","")
    return function() {
        infoAboutMistake.textContent = "Компьютер загадывает число! Начало игры через: 00:0" + seconds
        seconds--;
        return seconds;
    }
}

let randomNumber;

function startGame() 
{
    let min = parseInt(inputStartInterval.value)
    let max = parseInt(inputFinishInterval.value)
    randomNumber = min + Math.floor(Math.random() * (max - min + 1))

    startTip.textContent = min
    finishTip.textContent = max
    countTry.textContent = Math.floor(Math.log2(max - min + 1))

    panelInitInterval.classList.add("d-none")
    game.classList.remove("d-none")
}

// function generateComparerUserValueWithCompValue(compValue) {
//     return function(value) {
//         return parseInt(value) === compValue
//     }
// }

function compareValues() {

    countTry.textContent = parseInt(countTry.textContent) - 1
    let isWin;
    let message;

    if (parseInt(inputUserNumber.value) > randomNumber) 
    {
        resText.textContent = "Загаданное число меньше введенного!"
    }
    else if (parseInt(inputUserNumber.value) < randomNumber)
    {
        resText.textContent = "Загаданное число больше введенного!"
    }
    else  
    {
        isWin = true
        message = "Вы выиграли!" + " Это число: " + randomNumber
    }

    let isHaveCountTry = parseInt(countTry.textContent)

    if (!isHaveCountTry)
        message = "Вы проиграли! Попытки закончились!" + " Это число: " + randomNumber

    if (!isHaveCountTry || isWin) 
    {
        finishPanel.classList.remove("d-none")
        game.classList.add("d-none")
        finishRes.textContent = message
    }
}

function prepareGame() 
{
    let timer = generateTimer(5);
    let timerId = setInterval(timer, 1000)

    setTimeout(() => { clearInterval(timerId) }, 7000);
    setTimeout(startGame, 7000)
}

function restartGame() {

    inputUserNumber.value=""
    resText.textContent = "Здесь отобразится результат Вашей попытки!"
    infoAboutMistake.textContent = ""
    finishPanel.classList.add("d-none")
    panelInitInterval.classList.remove("d-none")
    inputStartInterval.removeAttribute("disabled")
    inputFinishInterval.removeAttribute("disabled")
}