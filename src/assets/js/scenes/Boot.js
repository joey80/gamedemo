import Button1 from '../../images/ui/blue_button01.png';
import Button2 from '../../images/ui/blue_button02.png';
import Items from '../../images/items.png';
import Characters from '../../images/characters.png';
import GoldSound from '../../audio/Pickup.wav';
import BackgroundExtruded from '../../images/background-extruded.png';

class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.loadImages();
    this.loadSpriteSheets();
    this.loadAudio();
    this.loadTileMap();
  }

  loadAudio() {
    this.load.audio('goldSound', GoldSound);
  }

  loadImages() {
    this.load.image('button1', Button1);
    this.load.image('button2', Button2);
    this.load.image('background', BackgroundExtruded);
  }

  loadSpriteSheets() {
    this.load.spritesheet('items', Items, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('characters', Characters, { frameWidth: 32, frameHeight: 32 });
  }

  loadTileMap() {
    this.load.tilemapTiledJSON('map', 'src/assets/level/large_level.json');
  }

  create() {
    this.scene.start('Game');
  }
}

export default Boot;
