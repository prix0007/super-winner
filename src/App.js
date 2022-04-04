import logo from "./logo.svg";
import "./App.css";

import React, { useEffect, useState } from "react";
import Chessboard from "./chessboard";

function App() {
  const [curState, setCurState] = useState();
  const [nextState, setNextState] = useState();

  const [currentIter, setIter] = useState(0);
  const [currentHVal, setHVal] = useState(99999999);

  const [boardSize, setBoardSize] = useState(4);

  const [speed, setSpeed] = useState(1000);

  useEffect(() => {
    // Generate a new Board
    const nb = new Chessboard(boardSize)
      .generate_new_board()
      .generate_random_queens();

    setHVal(nb.find_attacking_pairs().length);
    setCurState(nb);

    // }
  }, []);

  React.useEffect(() => {
    var iteration = setInterval(() => {
      // All Update Code here.
      if (currentHVal > 0) {
        const next = new Chessboard(boardSize)
          .generate_new_board()
          .generate_random_queens();
        const newHVal = next.find_attacking_pairs().length;
        setNextState(next);

        // console.log(currentHVal);
        // console.log(next.find_attacking_pairs().length);

        if (newHVal < currentHVal) {
          console.log("Found a better state.");
          setHVal(newHVal);
          setCurState(next);
        }
        setIter(iter => iter + 1);
      }
      
    }, speed);

    return function cleanup() {
      clearInterval(iteration);
    };
  });

  const handleBoardSizeChange = (e) => {
    if (e.target.value > 0) {
      setBoardSize(parseInt(e.target.value));
      const nb = new Chessboard(e.target.value)
        .generate_new_board()
        .generate_random_queens();

      setHVal(99999999);
      setCurState(nb);
      setIter(0);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Stochastic Hill Climbing Algorithm</h2>
        <p>Enter a Board Size:</p>
        <input
          type="number"
          value={boardSize}
          onChange={(e) => handleBoardSizeChange(e)}
        />
        <p>Current H value: {currentHVal}</p>
        <p>Current Iteration Speed: {speed / 1000} Secs per iter </p>
        <p>Current Iteration: {currentIter}</p>
        <input type="range" min="1" max="1000" value={speed} class="slider" onChange={(e) => {setSpeed(e.target.value)}}/>
        <div className="main-wrapper">
          <div>
            <p>Current State</p>
            <div className="wrapper">
              {curState &&
                curState.display().map((row) => {
                  return (
                    <div className="row">
                      {row.map((e) => {
                        if (e === 0) {
                          return <p>0</p>;
                        } else {
                          return <p> Q </p>;
                        }
                      })}
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
            <p> Next State </p>
            <div className="wrapper">
              {nextState &&
                nextState.display().map((row) => {
                  return (
                    <div className="row">
                      {row.map((e) => {
                        if (e === 0) {
                          return <p>0</p>;
                        } else {
                          return <p> Q </p>;
                        }
                      })}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
