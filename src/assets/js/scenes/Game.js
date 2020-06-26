import Player from '../classes/Player';
import Chest from '../classes/Chest';
import { getRandXY } from '../lib/util';

class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.scene.launch('UI');
    this.score = 0;
  }

  create() {
    this.createAudio();
    this.createPlayer();
    this.createChest();
    this.createWalls();
    this.createInput();
    this.addCollisions();
  }

  addCollisions() {
    this.physics.add.collider(this.player, this.wall);
    this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
  }

  collectChest(player, chest) {
    this.goldPickupAudio.play();
    this.score += chest.coins;
    this.events.emit('updateScore', this.score);
    // chest.destroy();
    chest.makeInactive();
    this.time.delayedCall(1000, this.spawnChest, [getRandXY(this)], this);
  }

  createAudio() {
    this.goldPickupAudio = this.sound.add('goldSound');
  }

  createChest() {
    this.chests = this.physics.add.group();
    this.chestPositions = [getRandXY(this), getRandXY(this), getRandXY(this)];
    this.chestPositions.map((elm) => this.spawnChest(elm));
  }

  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createPlayer() {
    this.player = new Player(this, 32, 32, 'characters', 0);
  }

  createWalls() {
    this.wall = this.physics.add.image(500, 100, 'button1');
    this.wall.setImmovable();
  }

  spawnChest(elm) {
    let chest = this.chests.getFirstDead();
    if (chest) {
      chest.setPosition(elm[0], elm[1]);
      chest.makeActive();
    } else {
      chest = new Chest(this, elm[0], elm[1], 'items', 0);
      this.chests.add(chest);
    }
  }

  update() {
    this.player.update(this.cursors);
  }
}

export default Game;
