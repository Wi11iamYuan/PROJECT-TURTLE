import './App.css';
import { useState } from 'react';

function Box({ letter, color }) {
  return (
    <div className="box" style={{backgroundColor: {color}}}>
      {letter}
    </div>
  );
}

const board = [
  [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
  [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
  [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
  [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
  [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
  [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
  [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}]
 ];


function App() {
  function handleKeyPress(e) {
    console.log("You pressed a key." + e.key)
  }
  return (
    //onKeyPess from ChatGPT
    <div className="App" tabIndex={0} onKeyPress={(e) => { handleKeyPress(e); }}>
      {board.map((board,idx) => 
      {
        return (
          <div className = "row" key={idx}>
            {
              board.map((row,idx) => {
                return <Box letter = {row.letter} color= {row.status} key = {idx}/>
              })
            }  
          </div>
        );
      }
      )}
    </div>
  );
}

export default App;
