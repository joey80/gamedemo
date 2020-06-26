export function getRandXY(self) {
  const randoX = Phaser.Math.Between(100, self.scale.width - 100);
  const randoY = Phaser.Math.Between(100, self.scale.height - 100);
  return [randoX, randoY];
}
