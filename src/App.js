import logo from './logo.svg';
import './App.css';

import { useEffect} from "react";
import {Chessboard} from './chessboard';

function App() {

  useEffect(() => {
    const nb = new Chessboard(4).generate_new_board();
 
    console.log(nb.generate_random_queens())
    console.log(nb.display());
    console.log(nb.find_attacking_pairs());
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
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
