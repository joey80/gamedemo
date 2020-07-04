import ChestModel from './ChestModel';
import MonsterModel from './MonsterModel';
import { getRandomInt, getRandomIntFromRange } from '../../lib/util';
import { SpawnerType } from './utils';

class Spawner {
  constructor(config, spawnLocations, addObject, deleteObject) {
    const { id, spawnInterval, limit, spawnerType } = config;
    Object.assign(this, { id, spawnInterval, limit, spawnerType });

    this.spawnLocations = spawnLocations;
    this.addObject = addObject;
    this.deleteObject = deleteObject;
    this.objectsCreated = [];
    this.start();
  }

  pickRandomLocation() {
    const location = this.spawnLocations[getRandomInt(this.spawnLocations.length)];
    const invalidLocation = this.objectsCreated.some((obj) => {
      if (obj.x === location[0] && obj.y === location[1]) return true;
      return false;
    });

    if (invalidLocation) return this.pickRandomLocation();
    return location;
  }

  removeObject(id) {
    this.objectsCreated = this.objectsCreated.filter((obj) => obj.id !== id);
    this.deleteObject(id);
  }

  start() {
    this.interval = setInterval(() => {
      if (this.objectsCreated.length < this.limit) return this.spawnObject();
    }, this.spawnInterval);
  }

  spawnObject() {
    switch (this.spawnerType) {
      case SpawnerType.CHEST: {
        this.spawnChest();
      }
      case SpawnerType.MONSTER: {
        this.spawnMonster();
      }
    }
  }

  spawnChest() {
    const location = this.pickRandomLocation();
    const chest = new ChestModel(location[0], location[1], getRandomIntFromRange(10, 20), this.id);
    this.objectsCreated.push(chest);
    this.addObject(chest.id, chest);
  }

  spawnMonster() {
    const location = this.pickRandomLocation();
    const monster = new MonsterModel(
      location[0],
      location[1],
      getRandomIntFromRange(10, 20),
      this.id,
      getRandomIntFromRange(0, 20),
      getRandomIntFromRange(3, 5),
      1
    );
    this.objectsCreated.push(monster);
    this.addObject(monster.id, monster);
  }
}

export default Spawner;
