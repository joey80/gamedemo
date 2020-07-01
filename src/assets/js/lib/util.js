import { config } from '../../../index';

// export function getRandXY(self) {
//   const randoX = Phaser.Math.Between(100, self.scale.width - 100);
//   const randoY = Phaser.Math.Between(100, self.scale.height - 100);
//   return [randoX, randoY];
// }

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

export const getRandomIntFromRange = (min = 0, max) => {
  const finalMin = Math.ceil(min);
  const finalMax = Math.floor(max);
  return Math.floor(Math.random() * (finalMax - finalMin + 1)) + finalMin;
};

export function getRandXY() {
  const { height, width } = config;
  const offset = 100;
  const x = getRandomIntFromRange(offset, width - offset);
  const y = getRandomIntFromRange(offset, height - offset);
  return [x, y];
}
