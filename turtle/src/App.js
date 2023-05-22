import './App.css';
import { useState } from 'react';

function Box({ letter, color }) {
  let style = {
    display: 'flex',
  width: '50px',
  height: '50px',
  backgroundColor: color,
  border: '5px solid #000',
  padding: '10px',
  margin: '5px',
  textAlign: 'center'
  }
  return (
    <div className="box" style = {style}>
      {letter}
    </div>
  );
}

function Row( {guess, status} ){
  let letters = guess.split("");
  return (
<div className='row'>
  <Box letter = {letters[0]} color = {status[0]}/>
  <Box letter = {letters[1]} color = {status[1]}/>
  <Box letter = {letters[2]} color = {status[2]}/>
  <Box letter = {letters[3]} color = {status[3]}/>
  <Box letter = {letters[4]} color = {status[4]}/>
  <Box letter = {letters[5]} color = {status[5]}/>
</div>
  );
}

let guesses = [
"",
"",
"",
"",
"",
"",
""
];

let statuses = [
['white', 'white','white','white','white','white'],
['white', 'white','white','white','white','white'],
['white', 'white','white','white','white','white'],
['white', 'white','white','white','white','white'],
['white', 'white','white','white','white','white'],
['white', 'white','white','white','white','white'],
['white', 'white','white','white','white','white']
];

function App() {
  const [row, setRow] = useState(0);
  const [guessTrack, setGuessTrack] = useState(guesses);
  
   function handleKeyPress(e) {
    console.log("You pressed a key " + e.key);
    let word = guessTrack[0]
    word= word+e.key;
    let guess = guessTrack;
    guess[0] = word
    setGuessTrack(guess)
    }
  return (
    //onKeyPess from ChatGPT
    <div className="App" tabIndex={0} onKeyPress={(e) => { handleKeyPress(e); }}>
          <Row className = "row" guess = {guesses[0]} status = {statuses[0]}/>
          <Row className = "row" guess = {guesses[1]} status = {statuses[1]}/>
          <Row className = "row" guess = {guesses[2]} status = {statuses[2]}/>
          <Row className = "row" guess = {guesses[3]} status = {statuses[3]}/>
          <Row className = "row" guess = {guesses[4]} status = {statuses[4]}/>
          <Row className = "row" guess = {guesses[5]} status = {statuses[5]}/>
          <Row className = "row" guess = {guesses[6]} status = {statuses[6]}/>
    </div>
  );
}

export default App;
