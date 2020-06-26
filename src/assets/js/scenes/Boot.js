import Button1 from '../../images/ui/blue_button01.png';
import Button2 from '../../images/ui/blue_button02.png';
import Items from '../../images/items.png';
import Characters from '../../images/characters.png';
import GoldSound from '../../audio/Pickup.wav';

class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.loadImages();
    this.loadSpriteSheets();
    this.loadAudio();
  }

  loadImages() {
    this.load.image('button1', Button1);
    this.load.image('button2', Button2);
  }

  loadSpriteSheets() {
    this.load.spritesheet('items', Items, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('characters', Characters, { frameWidth: 32, frameHeight: 32 });
  }

  loadAudio() {
    this.load.audio('goldSound', GoldSound);
  }

  create() {
    this.scene.start('Game');
  }
}

export default Boot;
