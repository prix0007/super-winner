class Chessboard {
    board;
    size = 8;
    
    constructor(siz) {
        this.board = []

        this.size = siz ? siz : 8;
    }

    generate_new_board() {
        let init = [];
        for(let i=0; i< this.size; ++i) {
            init.push(new Array(this.size).fill(0))
        }
        this.board = init;
        return this
    }


    generate_random_queens() {
        for(let i =0; i< this.size; ++i) {
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
        for(let i = 0; i < this.board.length; ++i){
            for(let j =0; j < this.board.length; ++j){
                if(this.board[j][i] !== 0){
                    console.log("Queen Found!!!", this.board[j][i]);
                    this.check_horizontal(j, this.board[j][i]);
                }
            }
        }
    }


    check_horizontal(rIndex, q) {
        for(let i =0; i< this.board.length; ++i) {
            if(this.board[rIndex][i] !== 0 && this.board[rIndex][i].x !== q.x && this.board[rIndex][i].y !== q.y){
                console.log("Found a Attacking Queen !!!! - ", q , " -> ", this.board[rIndex][i]);
            }
        }
    }


    display(){
        return this.board
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
    Chessboard
}