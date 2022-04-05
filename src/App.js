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

  // Make sure cur state is a instance of `Chess` class
  const find_next_state = (curState) => {
    let states = curState.find_successor_states();

    let fin_states = [];
    states.forEach((b) => {
      let x = new Chessboard(boardSize).generate_new_board();
      x.set_board(b);
      let a_pairs = x.find_attacking_pairs();

      fin_states.push({
        board: b,
        h_val: a_pairs.length,
      });
    });

    // Sorting through h-values
    let s_fin_val = fin_states.sort((a, b) => a.h_val - b.h_val);

    let l_h_val = s_fin_val[0].h_val;

    let small_h_val_s_states = s_fin_val.filter((x) => {
      return x.h_val === l_h_val;
    });
    console.log(s_fin_val);
    console.log(small_h_val_s_states);

    let r_val = 0;
    if (small_h_val_s_states.length > 1) {
      r_val = Math.floor(Math.random() * small_h_val_s_states.length);
    }

    console.log("Just before making next state", small_h_val_s_states[r_val]);
    const nextState = new Chessboard(boardSize).set_board(
      small_h_val_s_states[r_val].board
    );

    console.log(nextState);

    return nextState;

  };

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
        const next = find_next_state(curState);
        const newHVal = next.find_attacking_pairs().length;
        setNextState(next);

        // console.log(currentHVal);
        // console.log(next.find_attacking_pairs().length);

        if (newHVal < currentHVal) {
          console.log("Found a better state.");
          setHVal(newHVal);
          setCurState(next);
        }
        setIter((iter) => iter + 1);
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
        <div className="flex-row" style={{ width: "auto" }}>
          <p>Enter a Board Size:</p>
          <input
            style={{
              marginLeft: 20,
            }}
            type="number"
            value={boardSize}
            onChange={(e) => handleBoardSizeChange(e)}
          />
        </div>
        <p>Current Attacking Queen Pairs: {currentHVal}</p>

        <p>Current Number: {currentIter}</p>
        <div className="flex-row">
          <p>Current Delay Speed: {speed / 1000} sec delay per round </p>
          <input
            type="range"
            min="1"
            max="1000"
            value={speed}
            class="slider"
            onChange={(e) => {
              setSpeed(e.target.value);
            }}
          />
        </div>
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
                          return <p></p>;
                        } else {
                          return <p className="queen"> Q </p>;
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
                          return <p> </p>;
                        } else {
                          return <p className="queen"> Q </p>;
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
