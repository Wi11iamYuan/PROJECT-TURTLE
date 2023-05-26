import './App.css';
import { useState, useEffect } from 'react';

import React from 'react';
import './App.css';
import Confetti from "react-confetti"
import letWords from "./words.js";

let data = letWords();
let WORD = data[Math.floor(Math.random() * data.length)].toUpperCase();
console.log(WORD)

function Title() {
  return (
    <div>
      <div className='Title'>TURTLE</div>
    </div>

  )
}


function Box({ letter, color, txtColor, transition, type, shake }) {
  let style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45px',
    height: '45px',
    border: transition ? '3px solid ' + color : '3px solid #d3d6da',
    boxShadow: type ? '0px 0px 5px 0px #2abbd1' : 'none',
    padding: '10px',
    paddingTop: '5px',
    margin: '2px',
    fontWeight: 'bold',
    fontSize: "45px",

    //got from chatgpt
    transition: 'transform 1s ease-in-out, color 1s ease-in-out, background-color 1s ease-in-out, border 1s ease-in-out, box-shadow 0.1s ease-in-out',
    //https://davidwalsh.name/css-flip
    transform: transition ? 'rotateX(360deg)' : 'none',
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'visible',
    backgroundColor: transition ? color : 'white',
    color: transition ? txtColor : 'black',
    animation: shake ? 'shake 0.52s cubic-bezier(.36,.07,.19,.97) both' : 'none'
  }
  return (
    <div className="box" style={style}>
      {letter}
    </div>
  );
}

function Row({ guess, status, color, transitions, typed, shaked }) {
  let letters = guess.split("");
  return (
    <div className='row'>
      <Box letter={letters[0]} color={status[0]} txtColor={color[0]} transition={transitions[0]} type={typed[0]} shake = {shaked}/>
      <Box letter={letters[1]} color={status[1]} txtColor={color[1]} transition={transitions[1]} type={typed[1]} shake = {shaked}/>
      <Box letter={letters[2]} color={status[2]} txtColor={color[2]} transition={transitions[2]} type={typed[2]} shake = {shaked}/>
      <Box letter={letters[3]} color={status[3]} txtColor={color[3]} transition={transitions[3]} type={typed[3]} shake = {shaked}/>
      <Box letter={letters[4]} color={status[4]} txtColor={color[4]} transition={transitions[4]} type={typed[4]} shake = {shaked}/>
      <Box letter={letters[5]} color={status[5]} txtColor={color[5]} transition={transitions[5]} type={typed[5]} shake = {shaked}/>
    </div>
  );
}

const guessTrack = [
  "",
  "",
  "",
  "",
  "",
  "",
  ""
];

const statusTrack = [
  ['white', 'white', 'white', 'white', 'white', 'white'],
  ['white', 'white', 'white', 'white', 'white', 'white'],
  ['white', 'white', 'white', 'white', 'white', 'white'],
  ['white', 'white', 'white', 'white', 'white', 'white'],
  ['white', 'white', 'white', 'white', 'white', 'white'],
  ['white', 'white', 'white', 'white', 'white', 'white'],
  ['white', 'white', 'white', 'white', 'white', 'white']
];

const colorTrack = [
  ['black', 'black', 'black', 'black', 'black', 'black'],
  ['black', 'black', 'black', 'black', 'black', 'black'],
  ['black', 'black', 'black', 'black', 'black', 'black'],
  ['black', 'black', 'black', 'black', 'black', 'black'],
  ['black', 'black', 'black', 'black', 'black', 'black'],
  ['black', 'black', 'black', 'black', 'black', 'black'],
  ['black', 'black', 'black', 'black', 'black', 'black']
];

const transitionTrack = [
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false]
];

const typedTrack = [
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false],
  [false, false, false, false, false, false]
];

const shakeTrack = [
false,
false,
false,
false,
false,
false,
false
];

function Feedback({text, display}){
  let style = {
    position: 'fixed',
    boxSizing: 'border-box',
    bottom: '0',
    left: '50%',
    display: 'flex',
    boxSizing: 'border-box',
    justifyContent: 'center',
    transform: 'translate(-50%, -50%)',
    alignItems: 'center',
    textAlign: 'center',
    padding: '10px',
    fontWeight: 'bold',
    borderRadius: '12px',
    marginBottom: '50px',
    transition: 'background-color 4s ease-in-out, color 4s ease-in-out',
    color: display ? 'white' : 'transparent',
    backgroundColor: display ? 'black' : 'transparent'
  };
  return(
  <div>
    <div className="feedback" style={style}>{text}</div>
  </div>
  );
}

function Lose({ show }){
  let style = {
    display: 'flex',
    position: 'fixed',
    top:'0',
    bottom:'0',
    left:'0',
    right:'0',
    background: show? 'black': 'transparent',
    opacity: '65%',
    transition: 'background 2s ease-in-out'
  }
return(
  <div>
    <div className='lose' style = {style}></div>
  </div>
);
}

function Lightening ({ show }){
let style = {
  position: 'absolute',
  display: show? 'flex': 'none',
  position: 'fixed',
  top:'0',
  bottom:'0',
  left:'0',
  right:'0',
  background: 'white',
  animation: show? 'lighting 10s linear infinite': 'none',
  opacity:'0'
};
  return(
    <div>
      <div className = 'light'  style={style}></div>
    </div>
  );
}

function Clouds({show, positionX, positionY, speed}){
  let style = {
    //found online
    backgroundImage: 'url(../output-onlinepngtools.png)',
    backgroundSize: '100% 70%',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    bottom: positionX,
    left: positionY,
    transform: 'translateX(-50%)',
    display: show? 'flex':'none',
    width: '1000px',
    height: '400px',
    opacity: '20%',
	  animation: show ? 'animateCloud ' + speed + ' linear infinite' : 'none'
  }
  return(
    <div className = 'cloud' style ={style}></div>
  );
}

//make it so you dont have to click the div to type
function playMusic(music){
  if(music){
    //chat gpt
    let audio = new Audio('../gentle-ocean-waves-mix-2018-19693.mp3');
    audio.loop = true;
    audio.play();
  }
}
let validKeys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 'ENTER', 'BACKSPACE']

function App() {
  //https://www.youtube.com/watch?v=8VGIsLF5LCw&t=312s for confetti
  const [uiProps, setUiProps] = useState({showConfetti: false})
  const [row, setRow] = useState(0);
  const [guesses, setGuesses] = useState(guessTrack);
  const [statuses, setStatuses] = useState(statusTrack);
  const [colors, setColors] = useState(colorTrack);
  const [transitions, setTransitions] = useState(transitionTrack);
  const [typed, setTyped] = useState(typedTrack);
  const [shaked, setShaked] = useState(shakeTrack);
  const [answer, setAnswer] = useState(WORD);
  const [display, setDisplay] = useState(false);
  const [show, setShow] = useState(false);
  const [won, setWon] = useState(false);
  const [music, setMusic] = useState(true);
  //formatting from chat gpt
  const handleKeyPress = async (e) => {

    playMusic(music);
    setMusic(false);
    let letter = e.key.toUpperCase()

    if (!validKeys.includes(letter)) {
      return;
    }
    // got ... from chat gpt
    let temp = [...guesses];
    let progress = temp[row];

    let tempStatus = [...statuses]
    let tempColors = [...colors]
    let tempTransitions = [...transitions];
    let tempTyped = [...typed];

    let tempShaked = [...shaked];

    if (row === 7 || won) {
      return;
    }
    else if (letter === 'ENTER' && progress.length === 6) {
      progress = progress.toLowerCase();
      if(!(data.includes(progress))){
        tempShaked[row] = true;
        setShaked(tempShaked);
        setTimeout(() => {
          tempShaked[row] = false;
          setShaked(tempShaked);
        }, 500);
        return;
      }
      progress = progress.toUpperCase();
      for (let i = 0; i < answer.length; i++) {
        tempTyped[row][i] = false;
      }
      setTyped(tempTyped);
      let letters = answer.split("");
      let dict = {};
      for (let i = 0; i < letters.length; i++) {
        if (!Object.keys(dict).includes(letters[i])) {
          dict[letters[i]] = 0;
        }
        dict[letters[i]]++;
      }
      for (let i = 0; i < answer.length; i++) {
        if (progress[i] === answer[i]) {
          tempStatus[row][i] = '#6aaa64'
          dict[answer[i]]--;
          tempColors[row][i] = 'white';
          tempTransitions[row][i] = true;
        }
      }
      for (let i = 0; i < answer.length; i++) {
        if (progress[i] === answer[i]) {

        } else {
          if (letters.includes(progress[i]) && tempStatus[row][i] !== 'green' && dict[progress[i]] > 0) {
            tempStatus[row][i] = '#c9b458';
            dict[progress[i]]--;
            tempColors[row][i] = 'white';
            tempTransitions[row][i] = true;
          } else {
            tempStatus[row][i] = '#787c7e';
            tempColors[row][i] = 'white';
            tempTransitions[row][i] = true;
          }
        }
      }
      setColors(tempColors);
      setStatuses(tempStatus);
      setTransitions(tempTransitions);
      let correct = 0;
      for (let i = 0; i < answer.length; i++) {
        if (statuses[row][i] === '#6aaa64') {
          correct++;
        }
      }
      if (correct === 6) {
        setWon(true);
        
        setUiProps({
        // Confetti eff
        showConfetti: true,
        })
        let audio = new Audio('../confetti-sound-effect-(hd)-By-tuna.voicemod.net.mp3');
        audio.play();
      }else if(row===6 && correct !== 6){
          setDisplay(true);
          setShow(true);
          let audio = new Audio('../epic-storm-thunder-rainwindwaves-no-loops-106800.mp3');
          audio.loop=true;
          //from chatgpt
          audio.volume = 0.2;
          audio.play();
      }
      setRow(row + 1);
      return;
    }
    else if (letter === 'ENTER') {
      return;
    }
    else if (letter === 'BACKSPACE' && progress.length !== 0) {
      //from chat gpt
      tempTyped[row][temp[row].length - 1] = false;
      setTyped(tempTyped);
      temp[row] = temp[row].slice(0, -1);
      setGuesses(temp);
      return;
    }
    else if (letter === 'BACKSPACE') {
      return;
    }
    else if (temp[row].length >= 6) {
      return;
    } else {
      temp[row] += letter;
      setGuesses(temp);
      tempTyped[row][temp[row].length - 1] = true;
      setTyped(tempTyped);
    }
  }

  //chat gpt
  useEffect(() => {
    var input = document.getElementsByClassName('App');
    var input = input[0];
    input.focus();
    input.click();
  
  });

  return (
    //onKeyDown from ChatGPT
    <div className="App" tabIndex={0} onKeyDown={(e) => { handleKeyPress(e); }}>
      {uiProps.showConfetti && <Confetti />}

      <Title />
      <div className="middle">
        <Row className="row" guess={guesses[0]} status={statuses[0]} color={colorTrack[0]} transitions={transitions[0]} typed={typed[0]} shaked = {shaked[0]}/>
        <Row className="row" guess={guesses[1]} status={statuses[1]} color={colorTrack[1]} transitions={transitions[1]} typed={typed[1]} shaked = {shaked[1]}/>
        <Row className="row" guess={guesses[2]} status={statuses[2]} color={colorTrack[2]} transitions={transitions[2]} typed={typed[2]} shaked = {shaked[2]}/>
        <Row className="row" guess={guesses[3]} status={statuses[3]} color={colorTrack[3]} transitions={transitions[3]} typed={typed[3]} shaked = {shaked[3]}/>
        <Row className="row" guess={guesses[4]} status={statuses[4]} color={colorTrack[4]} transitions={transitions[4]} typed={typed[4]} shaked = {shaked[4]}/>
        <Row className="row" guess={guesses[5]} status={statuses[5]} color={colorTrack[5]} transitions={transitions[5]} typed={typed[5]} shaked = {shaked[5]}/>
        <Row className="row" guess={guesses[6]} status={statuses[6]} color={colorTrack[6]} transitions={transitions[6]} typed={typed[6]} shaked = {shaked[6]}/>
      </div>
      <Clouds positionX = {'10%'} positionY = {'5%'} speed = {'35s'} show = {show}/>
      <Clouds positionX = {'60%'} positionY = {'20%'} speed = {'25s'} show = {show}/>
      <Clouds positionX = {'0%'} positionY = {'10%'} speed = {'20s'} show = {show}/>
      <Clouds positionX = {'-30%'} positionY = {'0%'} speed = {'15s'} show = {show}/>
      <Clouds positionX = {'30%'} positionY = {'25%'} speed = {'12s'} show = {show}/>
      <Lose  show = {show}/>
      <Lightening show={show}/>
      <Feedback display = {display} text = {answer}/>

    </div>

  );

}

export default App;
