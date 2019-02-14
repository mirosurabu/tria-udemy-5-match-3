class PreloadState extends Phaser.State {

  init() {
    // Fill background with white color
    this.game.stage.backgroundColor = '#fff';

    // Create preloading bar
    this.preloaderBar = new Phaser.Sprite(this.game, this.game.world.centerX, this.game.world.centerY, 'bar');
    this.preloaderBar.anchor.setTo(0.5);
    this.preloaderBar.scale.setTo(100, 1);

    // Set preloading sprite to be preloader bar
    this.load.setPreloadSprite(this.preloaderBar);

    // Add game objects to world
    this.game.world.add(this.preloaderBar);
  }

  preload() {
    // Images path
    this.load.path = 'assets/images/';

    // Load images
    this.load.image( 'bg',         'backyard2.png'   );
    this.load.image( 'block1',     'bean_blue.png'   );
    this.load.image( 'block2',     'bean_green.png'  );
    this.load.image( 'block3',     'bean_orange.png' );
    this.load.image( 'block4',     'bean_pink.png'   );
    this.load.image( 'block5',     'bean_purple.png' );
    this.load.image( 'block6',     'bean_yellow.png' );
    this.load.image( 'block7',     'bean_red.png'    );
    this.load.image( 'block8',     'bean_white.png'  );
    this.load.image( 'dead-block', 'bean_dead.png'   );
  }

  create() {
    this.state.start('PlayState');
  }
}

export default PreloadState;
