const quoteApiUrl = "https://api.quotable.io/random?minLength=300&maxLength=400";
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");

let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

//Display Random Queat;

const renderNewQuet = async() => {
    const responce = await fetch(quoteApiUrl);
    let data = await responce.json();
    quote = data.content;
    
    let arr = quote.split("").map((value) => {
        return "<span class='quote-chars'>" + value + "</span>";
    })

    quoteSection.innerHTML += arr.join("");
}


window.onload = () => {
    userInput.value = "";
    document.getElementById('start-test').style.display = 'block';
    document.getElementById('stop-test').style.display = 'none';
    userInput.disabled = true;
    renderNewQuet();
}


//Loginc to compare input word and display word;
userInput.addEventListener("input",() => {
    let quoteChar = document.querySelectorAll('.quote-chars');
    quoteChar = Array.from(quoteChar);
    let userInputChar = userInput.value.split("");


    quoteChar.forEach((char, index) => {
        if(char.innerText == userInputChar[index]) {
            char.classList.add("success");
        }
        //If user hasn't entered anything or backspaced
        else if(userInputChar[index] == null) {
             //Remove class if any
            if(char.classList.contains('success')) {
                char.classList.remove('success');
            }

            else{
                char.classList.remove('fail')
            }
        }
        //If user enter wrong character

        else{
            if(!char.classList.contains('fail')) {
                mistakes += 1;
                char.classList.add('fail');
            }
            document.getElementById('mistakes').innerText = mistakes;
        }

        let check = quoteChar.every(element => {
            return element.classList.contains('success');
        })

        if(check) {
            displayResult();
        }
    })
})
//End Compare

//Update Time

function updateTimer() {
    if(time == 0) {
        displayResult();
    }

    else if(time <= 10) {
        document.getElementById('time-color').style.color = 'red';
        document.getElementById('timer').innerText = --time + " (Seconds)";
    }

 
    else{
        document.getElementById('timer').innerText = --time + " (Seconds)";
    }
}

//Display Timer;
const timeReduse = () => {
    time = 60;
    timer = setInterval(updateTimer,1000);
}


//End display time
//start Display Result

const displayResult = () => {
    document.querySelector('.result').style.display = 'block';
    clearInterval(timer);
    document.getElementById('stop-test').style.display = 'none';
    userInput.disabled = true;
    let timeToken = 1;

    if(time != 0) {
        timeToken = (60 - time)/100;
    }
    document.getElementById('wpm').innerText = (userInput.value.length / 5 / timeToken).toFixed() + " (Words)";
    document.getElementById('accuracy').innerText = Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100) + "%";

}


//Start Test Button and End Test Button
const startTest = () => {
    mistakes = 0;
    timer = "";
    userInput.disabled = false;
    timeReduse();
    document.getElementById('start-test').style.display = "none";
    document.getElementById('stop-test').style.display = "block";
    document.getElementById('stop-test').style.backgroundColor = 'green';
}



