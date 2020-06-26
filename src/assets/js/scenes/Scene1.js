import Button1 from '../../images/ui/blue_button01.png';
import Items from '../../images/items.png';
import Characters from '../../images/characters.png';
import GoldSound from '../../audio/Pickup.wav';

class Scene1 extends Phaser.Scene {
  constructor() {
    super('bootGame');
  }

  preload() {
    this.load.image('button1', Button1);
    this.load.spritesheet('items', Items, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('characters', Characters, { frameWidth: 32, frameHeight: 32 });
    this.load.audio('goldSound', GoldSound);
  }

  create() {
    const goldPickupAudio = this.sound.add('goldSound');

    // add images
    this.add.image(100, 100, 'button1');
    this.chest = this.physics.add.image(300, 300, 'items', 0);

    // add wall and set collision
    this.wall = this.physics.add.image(500, 100, 'button1');
    this.wall.setImmovable();

    // add player and set scaling and collision
    this.player = this.physics.add.image(32, 32, 'characters', 0);
    this.player.setScale(2);
    this.player.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.wall);
    this.physics.add.overlap(this.player, this.chest, (player, chest) => {
      goldPickupAudio.play();
      chest.destroy();
    });

    // create keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    // set player movement
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
    }
  }
}

export default Scene1;
