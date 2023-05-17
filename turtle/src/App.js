import './App.css';
import { useState } from 'react';

function Box({ text }) {
  return (
    <div className="box">
      {text}
    </div>
  );
}

const boxes = [
  { id: 1, text: "" },
  { id: 2, text: "" },
  { id: 3, text: "" },
  { id: 4, text: "" },
  { id: 5, text: "" },
  { id: 6, text: "" }
];


function App() {
  const [index, setIndex] = useState(0);
  function handleKeyPress(e) {
    console.log("You pressed a key." + e.key)
    setIndex(index => index + 1);
    console.log(index);
  }
  return (
    //onKeyPess from ChatGPT
    <div className="App" tabIndex={0} onKeyPress={(e) => { handleKeyPress(e); }}>
      {boxes.map(boxes => (
        <Box key={boxes.id} text={boxes.text} />
      ))}
    </div>
  );
}

export default App;
