import Block from '../objects/Block.js';
import Board from '../objects/Board.js';
import Grid  from '../objects/Grid.js';

class PlayState extends Phaser.State {

  create() {
    // Create background
    this.bg = new Phaser.Sprite(this.game, 0, 0, 'bg');

    // Create board
    this.board = new Board(this.game, 8, 14, 7, 35, 2, 2);
    this.board.x = this.game.world.centerX - this.board.width  / 2;
    this.board.y = this.game.world.centerY - this.board.height / 2;
    
    // Add game objects to world
    this.game.world.add(this.bg);
    this.game.world.add(this.board);
  }

}

export default PlayState;
