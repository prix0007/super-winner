import logo from "./logo.svg";
import "./App.css";

import React, { useEffect, useState } from "react";
import Chessboard from "./chessboard";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function App() {
  const [curState, setCurState] = useState();
  const [nextState, setNextState] = useState();

  const [currentIter, setIter] = useState(0);
  const [currentHVal, setHVal] = useState(99999999);
  const [stop, setStop] = useState(false);

  const [boardSize, setBoardSize] = useState(8);

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
    // console.log(s_fin_val);
    // console.log(small_h_val_s_states);

    let r_val = 0;
    if (small_h_val_s_states.length > 1) {
      r_val = Math.floor(Math.random() * small_h_val_s_states.length);
      // console.log("Random Value: ", r_val)
    }

    // console.log("Just before making next state", small_h_val_s_states[r_val]);
    const nextState = new Chessboard(boardSize).set_board(
      small_h_val_s_states[r_val].board
    );

    // console.log(nextState);

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
      if (currentHVal > 0 && !stop) {
        const next = find_next_state(curState);
        const newHVal = next.find_attacking_pairs().length;
        setNextState(next);

        // console.log(currentHVal);
        // console.log(next.find_attacking_pairs().length);

        if (newHVal <= currentHVal) {
          // console.log("Found a better state.");
          setHVal(newHVal);
          setCurState(next);
        }
        setData([
          ...data,
          {
            name: currentIter + 1,
            attack_pair: newHVal,
          },
        ]);
        setIter((iter) => iter + 1);
      }
      if (currentHVal === 0) {
        setStop(true);
      }
    }, speed);

    return function cleanup() {
      clearInterval(iteration);
    };
  });

  const handleBoardSizeChange = (e) => {
    if (e.target.value >= 0) {
      setBoardSize(parseInt(e.target.value));
      const xx = new Chessboard(parseInt(e.target.value))
        .generate_new_board()
        .generate_random_queens();

      // console.log("Board resized: ", xx)
      setHVal(99999999);
      setCurState(xx);
      setIter(0);
      setData([
        {
          name: "Iter 0",
          attack_pair: xx.find_attacking_pairs().length,
        },
      ]);
    }
  };

  const [data, setData] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <h2 className="h2 mb-5">Stochastic Hill Climbing Algorithm</h2>
        <div className="d-flex" style={{justifyContent: "space-between"}}>
          <div className="px-5">
            <LineChart width={600} height={300} data={data}>
              <Line type="monotone" dataKey="attack_pair" stroke="#8884d8" />
              
              <XAxis dataKey="name" name="Iterations for Algo" fontSize={10}/>
              <YAxis name="Attacking Queen Pairs" fontSize={12}/>
              <Tooltip />
              
            </LineChart>
          </div>
          <div>
            <div className="flex-row mb-3" style={{ width: "auto" }}>
              <p className="h4 text-muted">Enter a Board Size:</p>
              <input
                style={{
                  marginLeft: 20,
                  height: 30,
                  fontSize: "1rem",
                }}
                type="number"
                value={boardSize}
                onChange={(e) => handleBoardSizeChange(e)}
              />
            </div>
            <p className="h4 text-start">Current Attacking Queen Pairs: {currentHVal}</p>

            <p className="h4 mb-3 text-start">Current Round Number: {currentIter}</p>
            <div className="d-flex">
              <p className="text-secondary h6 me-2">
                Current Delay Speed: {speed / 1000} sec delay per round{" "}
              </p>
              <input
                type="range"
                min="1"
                max="1000"
                value={speed}
                className="form-range"
                onChange={(e) => {
                  setSpeed(e.target.value);
                }}
              />
            </div>
            <div className="d-flex ">
              <p>
                Currently Program is :{" "}
                {stop ? (
                  <span className="text-danger">Stopped</span>
                ) : (
                  <span className="text-success">Running</span>
                )}
              </p>
              <button
                onClick={() => setStop(!stop)}
                className="btn btn-primary m-2"
              >
                {stop ? "Play" : "Stop"}
              </button>
            </div>
          </div>
        </div>
        <div className="main-wrapper">
          <div>
            <p>Current State</p>
            <div className="wrapper">
              {curState &&
                curState.display().map((row) => {
                  return (
                    <div className="m-0">
                      {row.map((e) => {
                        if (e === 0) {
                          return <span></span>;
                        } else {
                          return <span className="queen"> Q </span>;
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
                    <div className="m-0">
                      {row.map((e) => {
                        if (e === 0) {
                          return <span> </span>;
                        } else {
                          return <span className="queen"> Q </span>;
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
