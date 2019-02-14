class Block extends Phaser.Sprite {
  constructor(game, x, y, id) {
    super(game);

    // Set up input
    this.inputEnabled = true;
    this.events.onInputDown.add(() => {
      if (this.exists && this.id > 0 && this.onClick) {
        this.onClick.bind(this.onClickOwner)(this);
      }
    });

    this.reset(x, y, id);
  }

  reset(x, y, id) {
    super.reset(x, y);

    // Set anchor to center
    this.anchor.setTo(0.5);

    // Set scale to one
    this.scale.setTo(1);

    // Set block id and generate image name
    this.id        = id;
    this.imageName = `block${this.id}`;

    if (this.id > 0) {
      this.loadTexture(this.imageName);
    } else if (this.id == 0) {
      this.kill();
    }
  }

  select() {
    this.scale.setTo(1.5);
  }

  unselect() {
    this.scale.setTo(1);
  }

  setOnClick(onClick, owner) {
    this.onClick      = onClick;
    this.onClickOwner = owner;
  }

  kill() {
    this.id = 0;
    this.loadTexture('dead-block');

    this.game.time.events.add(Block.DYING_TIME, () => {
      super.kill();
    });
  }

  toString() {
    return this.id.toString();
  }
}

Block.DYING_TIME = 200;

export default Block;
