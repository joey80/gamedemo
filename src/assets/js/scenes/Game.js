import Player from '../classes/Player';
import Chest from '../classes/Chest';
import Map from '../classes/Map';
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
    this.createMap();
    this.createAudio();
    this.createPlayer();
    this.createChest();
    this.createInput();
    this.addCollisions();
  }

  addCollisions() {
    this.physics.add.collider(this.player, this.map.blockedLayer);
    this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
  }

  collectChest(player, chest) {
    this.goldPickupAudio.play();
    this.score += chest.coins;
    this.events.emit('updateScore', this.score);
    // chest.destroy();
    chest.makeInactive();
    this.time.delayedCall(1000, this.spawnChest, [getRandXY()], this);
  }

  createAudio() {
    this.goldPickupAudio = this.sound.add('goldSound');
  }

  createChest() {
    this.chests = this.physics.add.group();
    this.chestPositions = [getRandXY(), getRandXY(), getRandXY()];
    this.chestPositions.map((elm) => this.spawnChest(elm));
  }

  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createMap() {
    this.map = new Map(this, 'map', 'background', 'background', 'blocked');
  }

  createPlayer() {
    this.player = new Player(this, 224, 224, 'characters', 0);
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
