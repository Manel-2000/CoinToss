const button = document.getElementById("flip-button");
const coin = document.querySelector(".coin");
const coinEdge = document.querySelector(".coin-edge");

let result;
let currentRotation = 0;
let currentFace = "HEADS";

button.addEventListener("click", flipCoin);
coin.onanimationend = animationFinished; //didnt work with animationed


function flipCoin() {
    if (Math.random() < 0.5) {
        result = "HEADS";
    } 
    else {
        result = "TAILS";
    }

    let rotations = Math.floor(Math.random() * 4) + 4; //[0,1,2,3] + 4 = 4||5||6||7 rotations
    let degrees = rotations * 360;

    if (result !== currentFace) {
        degrees += 180;
    }

    let targetRotation = currentRotation + degrees;

    coin.style.setProperty("--rotation", targetRotation + "deg"); //updates the variable in css keyframes
    coin.style.setProperty("--current-rotation", currentRotation + "deg");

    currentRotation = targetRotation;
    currentFace = result;

    coin.classList.add("flipping"); //adds the flipping class in the html div
}


function animationFinished() {
    console.log("Animation finished!");
    coin.classList.remove("flipping"); //removes the flipping class in the html div
    //uses the css var to confirm that the coin lands with the correct perspective
    coin.style.transform = "rotateX(var(--perspective)) rotateY(" + currentRotation + "deg)"; 
}

function createCoinEdge() {
    const segments = 32;
    const radius = 60; //since the coind has W and H 120px the radius is 60

    let segmentWidth = 2 * radius * Math.tan(Math.PI / segments);

    for (let i = 0; i < segments; i++) { //creates "segments", 32 is acceptable for now
        const wrapper = document.createElement("div");
        const segment = document.createElement("div");
        wrapper.classList.add("edge-wrapper"); //add the edge-wrapper class to the wrapper div
        segment.classList.add("edge-segment");

        //distribute each segment evenly around the coin
        let angle = (360 / segments) * i; //calc the angle of each segment

        wrapper.style.transform = "rotateZ(" + angle + "deg)";

        segment.style.width = segmentWidth + "px";
        segment.style.left = (120 - segmentWidth) / 2 + "px";

        wrapper.appendChild(segment);
        coinEdge.appendChild(wrapper);
    }
}
createCoinEdge();