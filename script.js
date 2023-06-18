let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newGamebtn = document.getElementById("new-game");
let restartbtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

//winning pattern array
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6]];

//player X play first 
let xTurn = true;
let count = 0;

//disable all buttons
const disableButton = () => {
    btnRef.forEach((element) => element.disabled = true);
    //enable popup
    popupRef.classList.remove("hide");
};

//enable all button(for new game and restart)
const enableButton = () => {
    btnRef.forEach(element => {
        element.innerText = "";
        element.disabled = false;
    });
    //disable popup
    popupRef.classList.add("hide")
}

//this function is exucuted when the player wins
const winFunction = (letter) => {
    disableButton();
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins"
    }
    else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins"
    }
};

//Function for draw
const drawFunction = () => {
    disableButton();
    msgRef.innerHTML = "&#x1F60E;<br> Match Draw"
}

//new game
newGamebtn.addEventListener("click", () => {
    count = 0;
    enableButton();
})
restartbtn.addEventListener("click", () => {
    count = 0;
    enableButton();
})

//win logic 
const winChecker = () => {
    //loop through win pattern
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];
        //check if element are filled
        //if 3 empty elements are same and would give win as would
        if (element1 != "" && element2 != "" && element3 != "") {
            if (element1 == element2 && element2 == element3) {
                //if all 3 buttons have same values then pass the value to the winFunction
                winFunction(element1);
            }
        }
    }
};
//display X/O on click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            //display x
            element.innerText = "X";
            element.disabled = true;
        }
        else {
            xTurn = true;
            //display O
            element.innerText = "O";
            element.disabled = true;
        }
        //increment count on each click
        count += 1;
        if (count == 9) {
            // its a draw since there are a total of 9 boxed
            drawFunction();
        }
        //check fpr win on every click
        winChecker();
    })
});
//enable button and disable popup on page load
window.onload = enableButton;