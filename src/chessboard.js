class Chessboard {
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
      console.log(rx);
      this.board[rx][i] = new Queen(rx, i);
    }
  }

  find_attacking_pairs() {
    // Finding Attacking Pairs
    // 1. Search in a Col
    // 2. Find the Queen
    // 3. Find Conflicting pair to this queen
    // 4. Add to Conflicting Pairs Array
    for (let i = 0; i < this.board.length; ++i) {
      // ith is row
      for (let j = 0; j < this.board.length; ++j) {
        //jth is col
        if (this.board[i][j] !== 0) {
          console.log("Queen Found!!!", this.board[i][j]);
          this.check_horizontal(i, this.board[i][j]);
          this.check_diag_tl_br(i, j);
          this.check_diag_br_tl(i, j);
        }
      }
    }
  }

  check_horizontal(rIndex, q) {
    for (let i = 0; i < this.board.length; ++i) {
      if (this.board[rIndex][i] !== 0) {
        if (
          !(this.board[rIndex][i].x === q.x && this.board[rIndex][i].y === q.y)
        ) {
          console.log("Attacking Pair: ", q, " => ", this.board[rIndex][i]);
        }
      }
    }
  }

  check_diag_tl_br(x, y) {

    let startx, starty;
    if(x < y) {
      startx = 0;
      starty = y - x;
    } else {
      startx = x- y;
      starty = 0;
    }

    for (let i = startx, j = starty; i < this.size && j < this.size; ++i, ++j) {
      if (
        this.board[i][j] !== 0 &&
        !(this.board[i][j].x === x && this.board[i][j].y === y)
      ) {
        console.log(
          "Found an attacking pair in diagonal. ",
          x,
          y,
          " | ",
          this.board[i][j].x,
          this.board[i][j].y
        );
      }
    }
  }

  check_diag_br_tl(x, y){
    let startx, starty;
    if(x + y < this.board.length){
      starty = 0;
      startx = x + y;
    } else {
      // -1 because ARRAY
      startx = this.board.length - 1;
      starty = y - (this.board.length - (1 + x))
    }
    
    console.log("Starting Position is :", startx, starty);

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

module.exports = {
  Chessboard,
};
