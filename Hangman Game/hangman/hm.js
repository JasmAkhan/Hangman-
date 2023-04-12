const lettercontainer = document.getElementById("letter-container");
const optionscontainer = document.getElementById("options-container");
const userinputsection = document.getElementById("user-input-section");
const newgamecontainer = document.getElementById("letter-container");
const newgamebutton = document.getElementById("new-game-container");
const canvas = document.getElementById("canvas");
const resulttext = document.getElementById("result-text");

//options value for buttons
 let options = {
    fruits: [
        "Apple",
        "Blueberry",
        "Mandarin",
        "Pineapple",
        "Pomegranate",
        "Watermelon",
    ],
    animals: ["Hedgehog", "Rhinoceros", "Squirrel", "Panther", "Walrus", "Zebra"],
    countries: [
        "India",
        "Hungary",
        "Africa",
        "Dubai",
        "Pakistan",
        "Zimbabwe",
    ],
 };

 //count
let winCount = 0;
let count = 0;
let chosenWord = "";

//Display Option buttons
const displayOptions = () => {
    optionscontainer.innerHTML += '<h3>Please Select An Option</h3>';
    let buttonCon = document.createElement("div");
    for (let value in options) 
    optionscontainer.appendChild(buttonCon);

};

//Block all the buttons
const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");

    //disable all options
    optionsButtons.forEach((button) => {
        button.disabled = true;
    });

    //disable all letters
    letterButtons.forEach((button) => {
        button.disabled.true;
    });
    newgamecontainer.classList.remove("hide");
};

//word generator
const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");
    //if optionvalue macthes the button innertext then highlight the button
    optionsButtons.forEach((button) => {
        if(button.innerText.toLowerCase() === optionValue) {
            button.classList.add("active");
        }
        button.disabled = true;
    });

    //initially hide letters, clear previous word
    lettercontainer.classList.remove("hide");
    userinputsection.innerText = "";

    let optionArray = options[optionValue];

    //chose random word
    chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
    chosenWord = chosenWord.toUpperCase();

    //replace every letter with span containing dash
    let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');

    //display each element as span
    userinputsection.innerHTML = displayItem;
};

const initializer = () => {
    winCount = 0;
    count = 0;

    userinputsection.innerHTML = "";
    optionscontainer.innerHTML = "";
    lettercontainer.classList.add("hide");
    newgamecontainer.classList.add("hide");
    lettercontainer.innerHTML = "";

    for (let i = 65; i < 91; i++) {
        let button = document.createElement("button");
        button.classList.add("letters");
        button.innerText = String.fromCharCode(i);
        button.addEventListener("click", () => {
            let charArray = chosenWord.split("");
            let dashes = document.getElementsByClassName("dashes");
            
            if (charArray.includes(button.innerText)) {
                charArray.forEach((char, index) => {
                    if (char === button.innerText) {
                        dashes[index].innerText = char;
                        winCount += 1;
                        if (winCount == charArray.length) {
                            

                            blocker();
                        }
                    }
                
                });
            } else {
                count += 1;
                drawMan(count);
                if (count == 6) {
                    
                    blocker();
                }
            }
            button.disabled = true;
        });
        lettercontainer.append(button);
    }

    displayOptions();
    let { initalDrawing } = canvasCreator();

    initalDrawing();
};

const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;

    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();

    };

    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    };

    const body = () => {
        drawLine(70, 40, 70, 80);
    };

    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    };

    const rightArm = () => {
        drawLine(70, 50, 90, 70);
    };

    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    };

    const rightLeg = () => {
        drawLine(70, 80, 90, 110);
    };

    const initalDrawing = () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        drawLine(10, 130, 130, 130);
        drawLine(10, 10, 10, 131);
        drawLine(10, 10, 70, 10);
        drawLine(70, 10, 70, 20);
    };

    return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};

const drawMan = (count) => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {
        case 1:
          head();
          break;
        case 2:
          body();
          break;
        case 3:
            leftArm();
            break;
        case 4:
            rightArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rightLeg();
            break;
        default:
            break;
    }
};

newgamebutton.addEventListener("click", initializer);
window.onload = initializer;
