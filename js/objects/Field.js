class Field extends Phaser.Sprite {
  constructor(game, x, y, size) {
    super(game, x, y);

    // Create background image
    this.imgBg = new Phaser.BitmapData(this.game, '', size, size);
    this.imgBg.ctx.fillStyle = '#000';
    this.imgBg.ctx.fillRect(0, 0, size, size);

    // Set backgrind image as texture of this sprite
    this.loadTexture(this.imgBg);

    // Set alpha to 20 percent
    this.alpha = 0.2;
  }
}

export default Field;
