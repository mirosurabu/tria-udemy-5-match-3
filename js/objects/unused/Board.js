class Board {
  constructor(numCols, numRows, numBlockTypes) {
    // Set basic grid data (number of columns, number of rows and number of block types)
    this.numCols       = numCols;
    this.numRows       = numRows;
    this.numBlockTypes = numBlockTypes;

    // Create an empty board and then populate it with random values
    this.createEmpty();
    this.populateRandomly();
  }

  createEmpty() {
    this.grid = [];
    for (let y = 0; y < this.numRows; y++) {
      let row = [];
      for (let x = 0; x < this.numCols; x++) {
        row.push(0);
      }
      this.grid.push(row);
    }
  }

  populateRandomly() {
    for (let y = 0; y < this.grid.length; y++) {
      let row = this.grid[y];
      for (let x = 0; x < row.length; x++) {
        row[x] = this.generateRandomBlock();
      }
    }

    if (this.getNumChained() > 0) {
      //this.populateRandomly();
    }
  }

  // Swaps two blocks
  swap(x1, y1, x2, y2) {
    let block = this.grid[y1][x1];
    this.grid[y1][x1] = this.grid[y2][x2];
    this.grid[y2][x2] = block;
  }

  // Eliminates blocks that form a chain/cluster
  eliminate() {
    this.grid = this.map((block, x, y) => {
      if (this.isChained(x, y)) {
        return 0;
      } else {
        return block;
      }
    });
  }

  // Drops blocks that stand on top of unoccupied positions (by one position)
  drop() {
    for (let x = 0; x < this.numCols; x++) {
      for (let y = this.numRows - 1; y >= 0; y--) {
        if (this.isEmpty(x, y)) {
          if (y == 0) {
            this.grid[y][x] = this.generateRandomBlock();
          } else {
            this.swap(x, y, x, y - 1);
          }
        }
      }
    }
  }

  // Drops blocks that stand on top of unoccupied positions (all the way down)
  dropFull() {
    for (let x = 0; x < this.numCols; x++) {
      for (let y = this.numRows - 1; y >= 0; y--) {
        if (this.isEmpty(x, y)) {
          for (let y2 = y - 1; y2 >= -1; y2--) {
            if (y2 >= 0) {
              if (!this.isEmpty(x, y2)) {
                this.swap(x, y, x, y2);
                break;
              }
            } else {
              this.grid[y][x] = this.generateRandomBlock();
            }
          }
        }
      }
    }
  }

  // Determines whether a block at a given position is part of a chain/cluster or not
  isChained(x, y) {
    var value = this.grid[y][x];

    if (value == 0) return false;

    return this.getAt(x - 1,   y  ) == value && this.getAt(x - 2,   y  ) == value ||
           this.getAt(x + 1,   y  ) == value && this.getAt(x + 2,   y  ) == value ||
           this.getAt(x - 1,   y  ) == value && this.getAt(x + 1,   y  ) == value ||
           this.getAt(  x  , y - 1) == value && this.getAt(  x  , y - 2) == value ||
           this.getAt(  x  , y + 1) == value && this.getAt(  x  , y + 2) == value ||
           this.getAt(  x  , y - 1) == value && this.getAt(  x  , y + 1) == value;
  }

  // Returns an array of positions that contain blocks that are part of a chain/cluster
  getChained() {
    let chained = [];

    this.forEach((block, x, y) => {
      if (this.isChained(x, y)) {
        chained.push({x: x, y: y});
      }
    });

    return chained;
  }

  // Returns the number of blocks that form a chain/cluster
  getNumChained() {
    let numChained = 0;

    this.forEach((block, x, y) => {
      if (this.isChained(x, y)) {
          numChained++;
      }
    });

    return numChained;
  }

  // Returns the number of unoccupied (empty) places on the board
  getNumEmpty() {
    let numEmpty = 0;

    this.forEach((block) => {
      if (block == 0) {
        numEmpty++;
      }
    });

    return numEmpty;
  }

  // Determines whether a place is empty (= unoccupied) or not
  isEmpty(x, y) {
    if (!this.grid[y]) {
      return false;
    }

    return this.grid[y][x] == 0;
  }

  // Generates a random block
  generateRandomBlock() {
    return Math.floor(Math.random() * this.numBlockTypes) + 1;
  }

  // Returns block at specified position
  // If given position is out of bounds, returns undefined
  getAt(x, y) {
    if (!this.grid[y]) {
      return undefined;
    }

    return this.grid[y][x];
  }

  map(callback) {
    var result = [];

    for (let y = 0; y < this.numRows; y++) {
      result[y] = [];
      for (let x = 0; x < this.numCols; x++) {
        result[y][x] = callback(this.grid[y][x], x, y);
      }
    }

    return result;
  }

  forEach(callback) {
    for (let y = 0; y < this.numRows; y++) {
      for (let x = 0; x < this.numCols; x++) {
        callback(this.grid[y][x], x, y);
      }
    }
  }

  toString() {
    var strGrid = '\n';

    for (let y = 0; y < this.grid.length; y++) {
      let strRow = '';
      for (let x = 0; x < this.grid[y].length; x++) {
        strRow += this.grid[y][x] + ' ';
      }
      strGrid += strRow + '\n';
    }

    return strGrid;
  }

  log() {
    console.log(this.toString());
  }

}

Board.areAdjacent = function(x1, y1, x2, y2) {
  return x1 == x2 && Math.abs(y1 - y2) == 1 || y1 == y2 && Math.abs(x1 - x2) == 1;
}

export default Board;
