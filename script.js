const startMetronome = document.querySelector(".start-metronome");
const metronomeLight = document.querySelector(".metronome-light");
let inputTempo = document.querySelector(".input-tempo");
let upper = document.querySelector("#upper-numeral");
let bars = document.querySelector("#bars");
const bpmDisp = document.querySelector(".bpm-display");
const dispBeatNum = document.querySelector(".dispBeatNumber");
const increaseBy = document.querySelector("#increase-by");
const every = document.querySelector("#every");
const resetSimple = document.querySelector(".reset-simple");

// metronomo basico


let barArr = [

    // {
    //     beatsPerBar: 4,
    //     lowerNum: 4,
    //     tempo: 160,
    //     repeatBar: 4,
    // },
    // {
    //     beatsPerBar: 2,
    //     lowerNum: 4,
    //     tempo: 60,
    //     repeatBar: 4,
    // }

];

let simpleBar = {
    beatsPerBar: +upper.value,
    lowerNum: 4,
    tempo: +inputTempo.value,
    repeatBar: 100

};

let increase = 0;
let everyBars = 0;
let mode = "simple";

inputTempo.min = 30;
inputTempo.max = 400;

inputTempo.addEventListener("input", (e) => {


    if (toggleMetronome === "on" && +e.target.value >= 30 && +e.target.value <= 400) {

        simpleBar.tempo = +e.target.value;

        clearInterval(intervalo);
        intervalo = setInterval(soundBeat, 60000 / +e.target.value);
    }
    if (toggleMetronome === "off" && +e.target.value >= 30 && +e.target.value <= 400) {

        simpleBar.tempo = +e.target.value;

    }

    if (toggleMetronome === "off" && +e.target.value < 30 || toggleMetronome === "off" && +e.target.value > 400) {
        startMetronome.disabled = true;
    } else {
        startMetronome.disabled = false;
    }
});

upper.addEventListener("input", (e) => {
    simpleBar.beatsPerBar = +e.target.value;
});

increaseBy.addEventListener("input", (e) => {
    increase = +e.target.value;
});

every.addEventListener("input", (e) => {
    everyBars = +e.target.value;
})




let toggleMetronome = "off";
let intervalo;
const beat = new Audio("./click1.flac");
const takt = new Audio("./click2.wav");
let beatCounter = 0;
let barCounter = 0;
let subset = 0;
let paraBeatCounter = 0;
let savedTempo = 0;
let savedBPB = 0;
let phraseCount = 0;
let repeatPhrase = "no"



startMetronome.addEventListener("click", playMetronomeSimple);

function playMetronomeSimple() {
    if (toggleMetronome === "off") {
        barArr = [];
        barArr.push(simpleBar);
        playMetronome();
        if (savedBPB === 0 && savedTempo === 0) {
            savedTempo = simpleBar.tempo;
            savedBPB = simpleBar.beatsPerBar;
        }
    } else if (toggleMetronome === "on") {
        playMetronome();

    }
}


function playMetronome() {


    if (toggleMetronome === "off") {

        intervalo = setInterval(soundBeat, 60000 / barArr[subset].tempo);
        toggleMetronome = "on";


    } else if (toggleMetronome === "on") {

        clearInterval(intervalo);
        toggleMetronome = "off";
        beatCounter = 0;
        barCounter = 0;
        paraBeatCounter = 0;
        subset = 0;
    }

}

function soundBeat() {
    countBeats();

    if (beatCounter === 1) {
        takt.currentTime = 0;
        takt.play();
    } else {
        beat.currentTime = 0;
        beat.play();
    }



    countBars();
    setCounter();
    lightMetronome();
    displayBPM();
    countCycles();
};

function displayBPM() {
    bpmDisp.textContent = barArr[subset].tempo;
    inputTempo.value = barArr[subset].tempo; ///////////////
}

function lightMetronome() {
    metronomeLight.style.backgroundColor = "green";
    setTimeout(() => {
        metronomeLight.style.backgroundColor = "white";
    }, 70)
};

function countBeats() {
    beatCounter++;
    paraBeatCounter++;
    console.log("BEATS: " + beatCounter);
    dispBeatNum.textContent = beatCounter
    console.log(cycleCounter);

    if (beatCounter === barArr[subset].beatsPerBar) {
        beatCounter = 0;
    }




}
function countBars() {
    if (beatCounter === 1) {
        barCounter++;
        console.log("B A R S: " + barCounter);
    }
    if (barCounter === barArr[subset].repeatBar) {
        barCounter = 0;

    }


    ///////// incrementos

    if (mode === "simple" && everyBars !== 0) {
        if (barCounter === everyBars + 1) {
            clearInterval(intervalo);
            barArr[subset].tempo += increase;
            barCounter = 1;
            intervalo = setInterval(soundBeat, 60000 / barArr[subset].tempo);
        }
    }
}

function setCounter() {
    if (paraBeatCounter === barArr[subset].repeatBar * barArr[subset].beatsPerBar + 1 && subset === barArr.length - 1) {
        if (repeatPhrase === "yes") {

            beatCounter = 1;
            barCounter = 0;
            subset = 0;
            paraBeatCounter = 1;

            clearInterval(intervalo);
            intervalo = setInterval(soundBeat, 60000 / barArr[subset].tempo);
        } else {
            clearInterval(intervalo);
            toggleMetronome = "off";
            beatCounter = 0;
            barCounter = 0;
            subset = 0;
            paraBeatCounter = 0;
        }

    }

    if (paraBeatCounter === barArr[subset].repeatBar * barArr[subset].beatsPerBar + 1) {

        subset++;
        console.log(`G R O U P S counted: ${subset}`);
        paraBeatCounter = 1;

        tempoBridge();
    }


}

////// pendiente

function countCycles() {
    if (paraBeatCounter === 0) {
        cycleCounter++;
    }
}


////////////////// hasta aki
function tempoBridge() {

    clearInterval(intervalo);
    intervalo = setInterval(soundBeat, 60000 / barArr[subset].tempo);


}

class Subset {
    constructor(bpb, nm, tmp, rptBar) {
            this.beatsPerBar = bpb,
            this.name = nm,
            this.tempo = tmp,
            this.repeatBar = rptBar
    }
}

// ADVANCED FEATURES

let advBpb = document.querySelector("#advBpb");
let advTmp = document.querySelector("#advTmp");
let advBars = document.querySelector("#advBars");
//let advFigure = document.querySelector("#advFigure");
let addBars = document.querySelector("#addBars");
let playPhrase = document.querySelector("#playAdvanced");
let displaySubsetInfo = document.querySelector(".displayGroupInfo");
let radios = document.querySelectorAll(".radio");
let simple = document.querySelector(".simple");
let advanced = document.querySelector(".advanced");
let rewindButton = document.querySelector(".rewind");
let save;
let tempSavedPhrases = [];
let arrOfPhrases = [];
let savedPhraseDisplay = document.querySelector(".displaySavedPhrases");
let stringified;
let tempStringified;


let test = "sec1"

addBars.addEventListener("click", pushSubset);

let humanPhraseName = "qwqw";

function pushSubset() {

    barArr.push(new Subset(+advBpb.value, "", +advTmp.value, +advBars.value));
    // display sets
    displayNewPhrase();


}
let inputPhraseName;

function displayNewPhrase() {
    displaySubsetInfo.textContent = "";
    let inner = "";
    
    for (let item of barArr) {
        inner += `Beats per Bar: ${item.beatsPerBar}; Tempo: ${item.tempo}; Cycle bar ${item.repeatBar} times; name: ${item.name}`;
    }
    let subsetInfo = document.createElement("p");
    subsetInfo.textContent = inner;
    displaySubsetInfo.appendChild(subsetInfo);
    inputPhraseName = document.createElement("input");
    inputPhraseName.placeholder = "name (optional)";
    displaySubsetInfo.appendChild(inputPhraseName);
    let savePhraseButton = document.createElement("button");
    savePhraseButton.classList.add("savePhrase");
    savePhraseButton.textContent = `save`;
    displaySubsetInfo.appendChild(savePhraseButton);

    let clearPhrase = document.createElement("button");
    clearPhrase.classList.add("clearPhrase");
    clearPhrase.textContent = "clear";
    displaySubsetInfo.appendChild(clearPhrase);
   // displaySubsetInfo.innerHTML = `${inner} <button id="savePhrase" type="button">save in browser</button>`;
    savePhraseButton.addEventListener("click", savePersistent);
    clearPhrase.addEventListener("click", clearResetAdvanced);
    

}

let counterFulls;

function savePersistent() {

    humanPhraseName = inputPhraseName.value;    
   

    tempSavedPhrases = [];
    tempStringified = "";

  
    for (let item of barArr) {
        item.name = humanPhraseName;
        tempSavedPhrases.push(item);
        console.log(item);
         
    }

    arrOfPhrases.push(tempSavedPhrases);

    


     stringified = JSON.stringify(arrOfPhrases);
     tempStringified = JSON.stringify(tempSavedPhrases);
    //  for (let i = 1; i < 5 ; i++) {
    //     if (localStorage.getItem(`sec${i}`) === null) {
    //         localStorage.setItem(`sec${i}`, stringified);
    //         return;
    //     }
    //     console.log("after for "+ localStorage.getItem(`sec${i}`))
    //  }

     let phraseNames = ["ph1", "ph2", "ph3", "ph4", "ph5"]


    counterFulls = 0;
     for (let item of phraseNames) {
        if (localStorage.getItem(item)===null) {
            localStorage.setItem(item, tempStringified)
            break;
        } else if (localStorage.getItem(item)!=null) {
            counterFulls++;
        }
     }
     if (counterFulls === 5) {
        console.log("memory full");
     }
    // console.log(phraseNames)


//     localStorage.setItem("sec1", stringified);
     

     // display saved phrase
     displaySavedPhrase();
     clearResetAdvanced();
     savedPhraseDisplay.textContent = "";
     refreshStoredDisplay();
    
}
function refreshStoredDisplay() {

    for (let i = 1; i <6 ; i++) {
        let playSaved = document.createElement("button");
        playSaved.textContent = "Play";
        

        let oldSavedPhrases = document.createElement("p")
        if (localStorage.getItem(`ph${i}`) === null) {
            continue;
        } 
        oldSavedPhrases.innerText = `(${i}) ${localStorage.getItem(`ph${i}`)}`
        savedPhraseDisplay.appendChild(oldSavedPhrases);
        oldSavedPhrases.appendChild(playSaved)
        playSaved.addEventListener("click", ()=>{
            barArr = [];
            let parsed = JSON.parse(localStorage.getItem(`ph${i}`));
            for (let item of parsed) {
                
                barArr.push(item);
                console.log(item);

            }
            playMetronomeAdvanced();

        })
        let deleteSaved = document.createElement("button");
        deleteSaved.textContent = "delete";
        oldSavedPhrases.appendChild(deleteSaved);
        deleteSaved.addEventListener("click", (e)=>{
            localStorage.removeItem(`ph${i}`)
            e.currentTarget.parentNode.remove();
            

        })
    }

}
refreshStoredDisplay();



function displaySavedPhrase() {
 
    
    // let newSavedPhrase = document.createElement("div");
    // newSavedPhrase.innerHTML = tempStringified;
    // savedPhraseDisplay.appendChild(newSavedPhrase);


    // let playStored = document.createElement("button");
    // playStored.classList.add("playStored");

    // let removeFromStorage= document.createElement("button");
    // removeFromStorage.classList.add("delete");
    // removeFromStorage.textContent = "Delete";

    // removeFromStorage.addEventListener("click", (e) => {
    //     console.log("lolo");
    //     e.currentTarget.parentNode.remove();

    // });
    // newSavedPhrase.appendChild(removeFromStorage);

}



playPhrase.addEventListener("click", playMetronomeAdvanced);

function playMetronomeAdvanced() {
    if (barArr.length === 0) {
        console.log("enter at least one bar");
    } else {
        playMetronome();
    }


}


let simplem = document.querySelector("#simple");
let advancedm = document.querySelector("#advanced");
if (simplem.checked === true) {
    advanced.classList.add("hide")
} else if (advancedm.checked === true) {
    simple.classList.add("hide")
}

for (let radio of radios) {
    if (radio.value === "simple") {
        radio.addEventListener("input", () => {
            console.log("simple");
            simple.classList.remove("hide");
            advanced.classList.add("hide");
            mode = "simple";
            clearResetAdvanced();

        })
    } else if (radio.value === "advanced") {
        radio.addEventListener("input", () => {
            console.log("advanced");
            advanced.classList.remove("hide");
            simple.classList.add("hide");
            barArr = [];
            mode = "advanced";

        })
    }
}

resetSimple.addEventListener("click", reset);

function reset() {
    clearInterval(intervalo);

    simpleBar = {
        beatsPerBar: 4,
        lowerNum: 4,
        tempo: 60,
        repeatBar: 100
    }
    increaseBy.value = 0;
    every.value = 0;

    increase = +increaseBy.value;
    everyBars = +every.value;

    toggleMetronome = "off";
    inputTempo.value = simpleBar.tempo;
    bpmDisp.textContent = simpleBar.tempo;
    simpleBar.beatsPerBar = +upper.value;

    beatCounter = 0;
    barCounter = 0;
    subset = 0;
    paraBeatCounter = 0;
    savedTempo = 0;
    savedBPB = 0;


}

rewindButton.addEventListener("click", rewind);

function rewind() {
    clearInterval(intervalo);
    simpleBar = {
        beatsPerBar: savedBPB,
        lowerNum: 4,
        tempo: savedTempo,
        repeatBar: 100


    }
    toggleMetronome = "off";
    barCounter = 0;
    beatCounter = 0;
}

let startPause = document.querySelector(".start-pause");

startPause.addEventListener("click", playMetronomeSimple);

let autoSpeedBtn = document.querySelector("#autospeed");
let autoSpeedWrapper = document.querySelector(".autospeed-wrapper");

let autoSpeedVisible = "no";

autoSpeedBtn.addEventListener("click", () => {
    if (autoSpeedVisible === "yes") {
        autoSpeedWrapper.classList.add("hide");
        startMetronome.classList.remove("hide");
        autoSpeedVisible = "no";
        reset();
    } else if (autoSpeedVisible === "no") {
        autoSpeedWrapper.classList.remove("hide");
        startMetronome.classList.add("hide");
        autoSpeedVisible = "yes";
    }
})

let clearadv = document.querySelector("#clearadv");

clearadv.addEventListener("click", clearResetAdvanced);
function clearResetAdvanced() {
    barArr = [];
    displaySubsetInfo.textContent = JSON.stringify(barArr);
    clearInterval(intervalo);
    toggleMetronome = "off";
    beatCounter = 0;
    barCounter = 0;
    subset = 0;
    paraBeatCounter = 0;
    advBpb.value = 0;
    advBars.value = 0;
  //  advFigure.value = 0;
    advTmp.value = 0;
}

let deleteLast = document.querySelector("#deletelast");

deleteLast.addEventListener("click", () => {
    barArr.pop();
    displaySubsetInfo.textContent = JSON.stringify(barArr);
    clearInterval(intervalo);
    toggleMetronome = "off";
    beatCounter = 0;
    barCounter = 0;
    subset = 0;
    paraBeatCounter = 0;
})

let repeadAdv = document.querySelector("#repeatadv");

if (repeadAdv.checked === true) {
    repeatPhrase = "yes";
}

repeadAdv.addEventListener("input", () => {
    if (repeatPhrase === "no") {
        repeatPhrase = "yes";
    } else {
        if (repeatPhrase === "yes") {
            repeatPhrase = "no";
        }
    }
})

let increaseAdv = document.querySelector("#increaseadv");
let everyCycles = document.querySelector("#everyCycles");

let percent = 0;
let percentDecimal = percent / 100;
let cycles = 0;
let cycleCounter = 0;

increaseAdv.addEventListener("input", (e) => {
    percent = +e.target.value;
})

everyCycles.addEventListener("input", (e) => {
    cycles = +e.target.value;
})

