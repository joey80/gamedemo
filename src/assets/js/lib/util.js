import { config } from '../../../index';

// export function getRandXY(self) {
//   const randoX = Phaser.Math.Between(100, self.scale.width - 100);
//   const randoY = Phaser.Math.Between(100, self.scale.height - 100);
//   return [randoX, randoY];
// }

export function getRandXY() {
  const { height, width } = config;
  const offset = 100;

  const getRandomInt = (min, max) => {
    const finalMin = Math.ceil(min);
    const finalMax = Math.floor(max);
    return Math.floor(Math.random() * (finalMax - finalMin + 1)) + finalMin;
  };

  const x = getRandomInt(offset, width - offset);
  const y = getRandomInt(offset, height - offset);
  return [x, y];
}
