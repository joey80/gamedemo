import Phaser from 'phaser';
import Scene1 from './assets/js/scenes/Scene1';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1280,
  height: 720,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 },
    },
  },
  scene: [Scene1],
};

const game = new Phaser.Game(config);
