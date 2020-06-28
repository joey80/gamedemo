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
    this.createMap();
    this.createAudio();
    this.createPlayer();
    this.createChest();
    this.createInput();
    this.addCollisions();
  }

  addCollisions() {
    this.physics.add.collider(this.player, this.blockedLayer);
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
    this.map = this.make.tilemap({ key: 'map' });
    this.tiles = this.map.addTilesetImage('background', 'background', 32, 32, 1, 2);
    this.backgroundLayer = this.map.createStaticLayer('background', this.tiles, 0, 0);
    this.blockedLayer = this.map.createStaticLayer('blocked', this.tiles, 0, 0);
    this.backgroundLayer.setScale(2);
    this.blockedLayer.setScale(2);
    this.blockedLayer.setCollisionByExclusion([-1]);

    // update world bounds
    this.physics.world.bounds.width = this.map.widthInPixels * 2;
    this.physics.world.bounds.height = this.map.heightInPixels * 2;
    // limit camera to world bounds
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels * 2, this.map.heightInPixels * 2);
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
