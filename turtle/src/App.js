import './App.css';
import { useState, useEffect } from 'react';

import React from 'react';
import logo from './logo.svg';
import './App.css';

function Title() {
  return (
    <div>
      <h1 className='Title'>Turtle</h1>
    </div>
  )
}

function Box({ letter, color, txtColor, transition}) {
  let style = {
    display: 'flex',
    width: '50px',
    height: '50px',
    border: '3px solid gray',
    padding: '10px',
    margin: '2px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: "40px",
    
    //got from chatgpt
    transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out, background-color 0.3s ease-in-out',
    transform: transition ? 'none' : 'none',
    backgroundColor: transition ? color : 'white',
    color: transition ? txtColor: 'black'
  }
  return (
    <div className="box" style = {style}>
      {letter}
    </div>
  );
}

function Row( {guess, status, color, transitions} ){
  let letters = guess.split("");
  return (
<div className='row'>
  <Box letter = {letters[0]} color = {status[0]} txtColor = {color[0]} transition = {transitions[0]}/>
  <Box letter = {letters[1]} color = {status[1]} txtColor = {color[1]} transition = {transitions[1]}/>
  <Box letter = {letters[2]} color = {status[2]} txtColor = {color[2]} transition = {transitions[2]}/>
  <Box letter = {letters[3]} color = {status[3]} txtColor = {color[3]} transition = {transitions[3]}/>
  <Box letter = {letters[4]} color = {status[4]} txtColor = {color[4]} transition = {transitions[4]}/>
  <Box letter = {letters[5]} color = {status[5]} txtColor = {color[5]} transition = {transitions[5]}/>
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
  [false, false,false,false,false,false],
]

let validKeys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", 'ENTER', 'BACKSPACE']
function App() {
  const [row, setRow] = useState(0);
  const [guesses, setGuesses] = useState(guessTrack);
  const [statuses, setStatuses] = useState(statusTrack);
  const [colors, setColors] = useState(colorTrack);
  const [transitions, setTransitions] = useState(transitionTrack);
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

    if(row === 7 || won){
      console.log("game over");
      return;
    }
    else if(letter === 'ENTER' && progress.length === 6){
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
          tempStatus[row][i] = '#6ca965'
          dict[answer[i]]--;
          tempColors[row][i] = 'white';
          tempTransitions[row][i] = true;
        }
      }
      for(let i=0; i < answer.length; i++){
        if(progress[i] === answer[i]){

        }else{
          if(letters.includes(progress[i]) && tempStatus[row][i] !== 'green' && dict[progress[i]] > 0){
            tempStatus[row][i] = '#c8b653';
            dict[progress[i]]--;
            tempColors[row][i] = 'white';
            tempTransitions[row][i] = true;
          }else{
            tempStatus[row][i] = '#a9a9a9';
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
        if(statuses[row][i] === 'green'){
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
    }
    }
    
  return (
    //onKeyDown from ChatGPT
    <div className="App" tabIndex={0} onKeyDown={(e) => { handleKeyPress(e); }}>
          <Title />
          <Row className = "row" guess = {guesses[0]} status = {statuses[0]} color = {colorTrack[0]} transitions = {transitions[0]}/>
          <Row className = "row" guess = {guesses[1]} status = {statuses[1]} color = {colorTrack[1]} transitions = {transitions[1]}/>
          <Row className = "row" guess = {guesses[2]} status = {statuses[2]} color = {colorTrack[2]} transitions = {transitions[2]}/>
          <Row className = "row" guess = {guesses[3]} status = {statuses[3]} color = {colorTrack[3]} transitions = {transitions[3]}/>
          <Row className = "row" guess = {guesses[4]} status = {statuses[4]} color = {colorTrack[4]} transitions = {transitions[4]}/>
          <Row className = "row" guess = {guesses[5]} status = {statuses[5]} color = {colorTrack[5]} transitions = {transitions[5]}/>
          <Row className = "row" guess = {guesses[6]} status = {statuses[6]} color = {colorTrack[6]} transitions = {transitions[6]}/>
    </div>
    
  );
  
}

export default App;
