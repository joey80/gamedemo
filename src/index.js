import Phaser from 'phaser';
import Game from './assets/js/scenes/Game';
import Boot from './assets/js/scenes/Boot';
import UI from './assets/js/scenes/UI';
import Title from './assets/js/scenes/Title';

export const config = {
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
  scene: [Boot, Title, Game, UI],
};

const game = new Phaser.Game(config);
