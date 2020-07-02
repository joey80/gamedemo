import ChestModel from './ChestModel';
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
    if (this.spawnerType === SpawnerType.CHEST) {
      this.spawnChest();
    }
  }

  spawnChest() {
    const location = this.pickRandomLocation();
    const chest = new ChestModel(location[0], location[1], getRandomIntFromRange(10, 20), this.id);
    this.objectsCreated.push(chest);
    this.addObject(chest.id, chest);
  }
}

export default Spawner;
