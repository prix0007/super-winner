import logo from './logo.svg';
import './App.css';

import { useEffect, useState} from "react";
import {Chessboard} from './chessboard';

function App() {

  const [chessboard, setChessboard] = useState();

  useEffect(() => {
    const nb = new Chessboard(4).generate_new_board();
 
    console.log(nb.generate_random_queens())
    console.log(nb.display());
    console.log(nb.find_attacking_pairs());
    setChessboard(nb);
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {chessboard && chessboard.display().map((row) => {
          return row.map((e) => {
            if(e === 0){
              return <p>0</p>
            } else {
              return <p>{e.x}</p>
            }
          })
        })}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
