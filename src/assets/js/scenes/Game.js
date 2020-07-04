import Player from '../classes/Player';
import Chest from '../classes/Chest';
import Map from '../classes/Map';
import Monster from '../classes/Monster';
import GameManager from '../classes/game_manager/GameManager';

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
    this.createGroups();
    this.createInput();
    this.createGameManager();
  }

  addCollisions() {
    this.physics.add.collider(this.player, this.map.blockedLayer);
    this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
  }

  collectChest(player, chest) {
    const { coins, id } = chest;

    this.goldPickupAudio.play();
    this.score += coins;
    this.events.emit('updateScore', this.score);
    chest.makeInactive();
    this.events.emit('pickUpChest', id);
  }

  createAudio() {
    this.goldPickupAudio = this.sound.add('goldSound');
  }

  createGroups() {
    this.chests = this.physics.add.group();
    this.monsters = this.physics.add.group();
  }

  createGameManager() {
    this.events.on('spawnPlayer', (location) => {
      this.createPlayer(location);
      this.addCollisions();
    });

    this.events.on('chestSpawned', (chest) => {
      this.spawnChest(chest);
    });

    this.events.on('monsterSpawned', (monster) => {
      this.spawnMonster(monster);
    });

    this.gameManager = new GameManager(this, this.map.map.objects);
    this.gameManager.setup();
  }

  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createMap() {
    this.map = new Map(this, 'map', 'background', 'background', 'blocked');
  }

  createPlayer(arr) {
    this.player = new Player(this, arr[0] * 2, arr[1] * 2, 'characters', 0);
  }

  spawnChest(chestObject) {
    const { x, y, gold, id } = chestObject;
    let chest = this.chests.getFirstDead();

    if (chest) {
      chest.coins = gold;
      chest.id = id;
      chest.setPosition(x * 2, y * 2);
      chest.makeActive();
    } else {
      chest = new Chest(this, x * 2, y * 2, 'items', 0, gold, id);
      this.chests.add(chest);
    }
  }

  spawnMonster(monsterObject) {
    const { x, y, frame, gold, health, id, maxHealth } = monsterObject;
    let monster = this.monsters.getFirstDead();

    if (monster) {
      monster.id = id;
      monster.health = health;
      monster.maxHealth = maxHealth;
      monster.setPosition(x * 2, y * 2);
      monster.setTexture('monsters', frame);
      monster.makeActive();
    } else {
      monster = new Monster(this, x * 2, y * 2, 'monsters', frame, id, health, maxHealth);
      this.monsters.add(monster);
    }
  }

  update() {
    if (this.player) this.player.update(this.cursors);
  }
}

export default Game;
