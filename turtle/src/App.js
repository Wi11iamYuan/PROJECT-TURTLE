import './App.css';
import { useState, useEffect, useRef } from 'react';

import React from 'react';
import logo from './logo.svg';
import './App.css';
import Title from './title';


function Box({ letter, color, txtColor, transition, type}) {
  let style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
    border: transition ? '3px solid '+ color : '3px solid #d3d6da',
    boxShadow: type ? '0px 0px 5px 0px #10778f' : 'none',
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
    color: transition ? txtColor: 'black',
    }
  return (
      <div className="box" style = {style}>
      {letter}
      </div>
  );
}

function Row( {guess, status, color, transitions, typed} ){
  let letters = guess.split("");
  return (
<div className='row'>
  <Box letter = {letters[0]} color = {status[0]} txtColor = {color[0]} transition = {transitions[0]} type = {typed[0]}/>
  <Box letter = {letters[1]} color = {status[1]} txtColor = {color[1]} transition = {transitions[1]} type = {typed[1]}/>
  <Box letter = {letters[2]} color = {status[2]} txtColor = {color[2]} transition = {transitions[2]} type = {typed[2]}/>
  <Box letter = {letters[3]} color = {status[3]} txtColor = {color[3]} transition = {transitions[3]} type = {typed[3]}/>
  <Box letter = {letters[4]} color = {status[4]} txtColor = {color[4]} transition = {transitions[4]} type = {typed[4]}/>
  <Box letter = {letters[5]} color = {status[5]} txtColor = {color[5]} transition = {transitions[5]} type = {typed[5]}/>
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
['white', 'white','white','white','white','white'],
['white', 'white','white','white','white','white'],
['white', 'white','white','white','white','white'],
['white', 'white','white','white','white','white'],
['white', 'white','white','white','white','white'],
['white', 'white','white','white','white','white'],
['white', 'white','white','white','white','white']
];

const colorTrack = [
  ['black', 'black','black','black','black','black'],
  ['black', 'black','black','black','black','black'],
  ['black', 'black','black','black','black','black'],
  ['black', 'black','black','black','black','black'],
  ['black', 'black','black','black','black','black'],
  ['black', 'black','black','black','black','black'],
  ['black', 'black','black','black','black','black']
];

const transitionTrack = [
  [false, false,false,false,false,false],
  [false, false,false,false,false,false],
  [false, false,false,false,false,false],
  [false, false,false,false,false,false],
  [false, false,false,false,false,false],
  [false, false,false,false,false,false],
  [false, false,false,false,false,false]
];

const typedTrack = [
  [false, false,false,false,false,false],
  [false, false,false,false,false,false],
  [false, false,false,false,false,false],
  [false, false,false,false,false,false],
  [false, false,false,false,false,false],
  [false, false,false,false,false,false],
  [false, false,false,false,false,false]
];

//answer randomizer
//make it so it verifies the word
//make it so you dont have to click the div to type 

let validKeys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 'ENTER', 'BACKSPACE']
function App() {
  const [row, setRow] = useState(0);
  const [guesses, setGuesses] = useState(guessTrack);
  const [statuses, setStatuses] = useState(statusTrack);
  const [colors, setColors] = useState(colorTrack);
  const [transitions, setTransitions] = useState(transitionTrack);
  const [typed, setTyped] = useState(typedTrack);
  const [answer, setAnswer] = useState("TURTLE");
  const [won, setWon] = useState(false);
  //formatting from chat gpt
   const handleKeyPress = async (e) => {
    console.log("You pressed a key " + e.key);
    let letter = e.key.toUpperCase()

    
    if(!validKeys.includes(letter)){
      return;
    }
    // got ... from chat gpt
    let temp = [...guesses];
    let progress = temp[row];

    let tempStatus = [...statuses]
    let tempColors = [...colors]
    let tempTransitions = [...transitions];
    let tempTyped = [...typed];

    if(row === 7 || won){
      console.log("game over");
      return;
    }
    else if(letter === 'ENTER' && progress.length === 6){
      for(let i=0;i<answer.length;i++){
        tempTyped[row][i] = false;
      }
      setTyped(tempTyped);
      let letters = answer.split("");
      let dict = {};
      for(let i = 0; i<letters.length; i++){
        if(!Object.keys(dict).includes(letters[i])){
          dict[letters[i]] = 0;
        }
        dict[letters[i]]++;
      }
      console.log(dict)
      for(let i = 0; i < answer.length;i++){
        if(progress[i] === answer[i]){
          tempStatus[row][i] = '#6aaa64'
          dict[answer[i]]--;
          tempColors[row][i] = 'white';
          tempTransitions[row][i] = true;
        }
      }
      for(let i=0; i < answer.length; i++){
        if(progress[i] === answer[i]){

        }else{
          if(letters.includes(progress[i]) && tempStatus[row][i] !== 'green' && dict[progress[i]] > 0){
            tempStatus[row][i] = '#c9b458';
            dict[progress[i]]--;
            tempColors[row][i] = 'white';
            tempTransitions[row][i] = true;
          }else{
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
      for(let i=0;i<answer.length;i++){
        if(statuses[row][i] === '#6aaa64'){
          correct++;
        }
      }
      if(correct===6){
        setWon(true);
      }
      setRow(row+1);
      return;
    }
    else if(letter === 'ENTER'){
      return;
    }
    else if(letter === 'BACKSPACE' && progress.length !== 0){
      //from chat gpt
      tempTyped[row][temp[row].length-1] = false;
      setTyped(tempTyped);
      temp[row] = temp[row].slice(0,-1);
      setGuesses(temp);
      return;
    }
    else if(letter ==='BACKSPACE'){
      return;
    }
    else if(temp[row].length >=6){
      console.log("max")
      return;
    }else{
      temp[row] += letter;
      setGuesses(temp);
      tempTyped[row][temp[row].length-1] = true;
      setTyped(tempTyped);
    }
    }
    
    
  return (
    //onKeyDown from ChatGPT
    //make it so you dont have to click
    <div className="App" tabIndex={0} onKeyDown={(e) => { handleKeyPress(e); }}>
      <Title />
          <Row className = "row" guess = {guesses[0]} status = {statuses[0]} color = {colorTrack[0]} transitions = {transitions[0]} typed = {typed[0]}/>
          <Row className = "row" guess = {guesses[1]} status = {statuses[1]} color = {colorTrack[1]} transitions = {transitions[1]} typed = {typed[1]}/>
          <Row className = "row" guess = {guesses[2]} status = {statuses[2]} color = {colorTrack[2]} transitions = {transitions[2]} typed = {typed[2]}/>
          <Row className = "row" guess = {guesses[3]} status = {statuses[3]} color = {colorTrack[3]} transitions = {transitions[3]} typed = {typed[3]}/>
          <Row className = "row" guess = {guesses[4]} status = {statuses[4]} color = {colorTrack[4]} transitions = {transitions[4]} typed = {typed[4]}/>
          <Row className = "row" guess = {guesses[5]} status = {statuses[5]} color = {colorTrack[5]} transitions = {transitions[5]} typed = {typed[5]}/>
          <Row className = "row" guess = {guesses[6]} status = {statuses[6]} color = {colorTrack[6]} transitions = {transitions[6]} typed = {typed[6]}/>
    </div>
    
  );
}

export default App;
