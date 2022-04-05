export default class Chessboard {
  board;
  size = 8;

  constructor(siz) {
    this.board = [];

    this.size = siz ? siz : 8;
  }

  generate_new_board() {
    let init = [];

    for (let i = 0; i < this.size; ++i) {
      init.push(new Array(this.size).fill(0));
    }
    this.board = init;
    return this;
  }

  generate_random_queens() {
    // ith index is row
    // jth index is col
    for (let i = 0; i < this.size; ++i) {
      const rx = Math.floor(Math.random() * this.size);

      this.board[rx][i] = new Queen(rx, i);
    }
    return this;
  }

  find_attacking_pairs() {
    // Finding Attacking Pairs
    // 1. Search in a Col
    // 2. Find the Queen
    // 3. Find Conflicting pair to this queen
    // 4. Add to Conflicting Pairs Array
    let all = [];
    for (let i = 0; i < this.board.length; ++i) {
      // ith is row
      for (let j = 0; j < this.board.length; ++j) {
        //jth is col
        if (this.board[i][j] !== 0) {
          // console.log("Queen Found!!!", this.board[i][j]);
          let c = this.check_horizontal(i, this.board[i][j]);
          let b = this.check_diag_tl_br(i, j);
          let a = this.check_diag_br_tl(i, j);
          all.push(...a);
          all.push(...b);
          all.push(...c);
        }
      }
    }
    // TODO: Remove all duplicate pairs

    let all_attacking_pairs = [];
    for (let i = 0; i < all.length; ++i) {
      for (let j = i + 1; j < all.length; ++j) {
        if (
          all[i].from[0] === all[j].to[0] && 
            all[i].from[1] === all[j].to[1] && 
            all[i].to[0] === all[j].from[0] && 
            all[i].to[1] === all[j].from[1]
        ) {
          // console.log(
          //   all[i].from[0] === all[j].to[0],
          //   all[i].from[1] === all[j].to[1],
          //   all[i].to[0] === all[j].from[0],
          //   all[i].to[1] === all[j].from[1]
          // );
          all_attacking_pairs.push(all[i]);
        }
      }
    }

    // console.log(all_attacking_pairs);
    return all_attacking_pairs;
  }

  check_horizontal(rIndex, q) {
    let attacking = [];
    for (let i = 0; i < this.board.length; ++i) {
      if (this.board[rIndex][i] !== 0) {
        if (
          !(this.board[rIndex][i].x === q.x && this.board[rIndex][i].y === q.y)
        ) {
          // console.log("Attacking Pair: ", q, " => ", this.board[rIndex][i]);
          attacking.push({ from: [q.x, q.y], to: [rIndex, i] });
        }
      }
    }
    return attacking;
  }

  check_diag_tl_br(x, y) {
    let startx, starty;
    if (x < y) {
      startx = 0;
      starty = y - x;
    } else {
      startx = x - y;
      starty = 0;
    }

    let attacking = [];

    for (let i = startx, j = starty; i < this.size && j < this.size; ++i, ++j) {
      if (
        this.board[i][j] !== 0 &&
        !(this.board[i][j].x === x && this.board[i][j].y === y)
      ) {
        // console.log(
        //   "Found an attacking pair in diagonal. ",
        //   x,
        //   y,
        //   " | ",
        //   this.board[i][j].x,
        //   this.board[i][j].y
        // );
        attacking.push({ from: [x, y], to: [i, j] });
      }
    }
    return attacking;
  }

  check_diag_br_tl(x, y) {
    let startx, starty;
    if (x + y < this.board.length) {
      starty = 0;
      startx = x + y;
    } else {
      // -1 because ARRAY
      startx = this.board.length - 1;
      starty = y - (this.board.length - (1 + x));
    }

    let attacking = [];

    for (let i = startx, j = starty; i >= 0 && j >= 0; i--, j++) {
      if (this.board[i][j] !== 0 && this.board[i][j] !== undefined) {
        if (!(this.board[i][j].x === x && this.board[i][j].y === y)) {
          // console.log("Found Attacking Queens: ", x, y  ,"-> ", i, j);
          attacking.push({ from: [x, y], to: [i, j] });
        }
      }
    }

    return attacking;
  }

  set_board(board) {
    this.board = board;
    return this
  }

  find_successor_states() {
    // Move 1 along the col
    // Fix all the queens 
    // Every col will have this.size - 1 Successor state
    // So total successor states wil be (this.size - 1)*(this.size)

    let all_successor_states = [];

    for(let i = 0; i<this.size; ++i) {
      
      for(let j=0; j<this.size; ++j) {
        
        if(this.board[j][i] === 0) {
          let copy = [];
          this.board.forEach((l) => {
            copy.push([...l])
          })
          
          for(let k =0; k < this.size ; ++k){
            copy[k][i] = 0;
          }
          copy[j][i] = new Queen(j, i);
          all_successor_states.push(copy);
        }
        
      }
    }

    return all_successor_states;

  }

  display() {
    return this.board;
  }
}

class Queen {
  x = null;
  y = null;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move(m_x, m_y) {
    this.x = m_x;
    this.y = m_y;
  }
}

