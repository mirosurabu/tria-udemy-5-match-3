class BootState extends Phaser.State {

  init() {
    this.scale.scaleMode             = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically   = true;
  }

  preload() {
    // Images path
    this.load.path = 'assets/images/';

    // Load images
    this.load.image('bar', 'preloader-bar.png');
  }

  create() {
    this.state.start('PreloadState');
  }

}

export default BootState;
