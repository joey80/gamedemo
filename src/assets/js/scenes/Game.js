import Player from '../classes/Player';
import Chest from '../classes/Chest';

class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  create() {
    const goldPickupAudio = this.sound.add('goldSound');

    // add images
    this.add.image(100, 100, 'button1');
    this.chest = new Chest(this, 300, 300, 'items', 0);

    // add wall and set collision
    this.wall = this.physics.add.image(500, 100, 'button1');
    this.wall.setImmovable();

    // add player and set scaling and collision
    this.player = new Player(this, 32, 32, 'characters', 0);
    this.physics.add.collider(this.player, this.wall);
    this.physics.add.overlap(this.player, this.chest, (player, chest) => {
      goldPickupAudio.play();
      chest.destroy();
    });

    // create keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.player.update(this.cursors);
  }
}

export default Game;
