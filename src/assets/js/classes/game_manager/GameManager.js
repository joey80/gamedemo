import Spawner from '../game_manager/Spawner';
import { getRandomInt } from '../../lib/util';
import { SpawnerType } from './utils';

class GameManager {
  constructor(scene, mapData) {
    this.scene = scene;
    this.mapData = mapData;

    this.spawners = {};
    this.chests = {};
    this.monsters = {};

    this.playerLocations = [];
    this.chestLocations = {};
    this.monsterLocations = {};
  }

  setup() {
    this.parseMapData();
    this.setupEventListeners();
    this.setupSpawners();
    this.spawnPlayer();
  }

  addChest(chestId, chest) {
    this.chests[chestId] = chest;
    this.scene.events.emit('chestSpawned', chest);
  }

  addMonster(monsterId, monster) {
    this.monsters[monsterId] = monster;
    this.scene.events.emit('monsterSpawned', monster);
  }

  deleteChest(chestId) {
    delete this.chests[chestId];
  }

  deleteMonster(monsterId) {
    delete this.monsters[monsterId];
  }

  parseMapData() {
    this.mapData.map((elm) => {
      switch (elm.name) {
        case 'player_locations': {
          return (this.playerLocations = elm.objects.map((obj) => [
            obj.x + obj.width / 2,
            obj.y - obj.height / 2,
          ]));
        }
        case 'chest_locations': {
          return this.updateLocation(elm.objects, this.chestLocations);
        }
        case 'monster_locations': {
          return this.updateLocation(elm.objects, this.monsterLocations);
        }
        default:
          return null;
      }
    });
  }

  setupEventListeners() {
    this.scene.events.on('pickUpChest', (chestId) => {
      if (this.chests[chestId]) {
        this.spawners[this.chests[chestId].spawnerId].removeObject(chestId);
      }
    });
  }

  setupSpawners() {
    let spawner;
    let config = {
      spawnInterval: 3000,
      limit: 3,
      spawnerType: '',
      id: '',
    };

    for (const key of Object.keys(this.chestLocations)) {
      config = {
        ...config,
        id: `chest-${key}`,
        spawnerType: SpawnerType.CHEST,
      };

      spawner = new Spawner(
        config,
        this.chestLocations[key],
        this.addChest.bind(this),
        this.deleteChest.bind(this)
      );

      this.spawners[spawner.id] = spawner;
    }

    for (const key of Object.keys(this.monsterLocations)) {
      config = {
        ...config,
        id: `monster-${key}`,
        spawnerType: SpawnerType.MONSTER,
      };

      spawner = new Spawner(
        config,
        this.monsterLocations[key],
        this.addMonster.bind(this),
        this.deleteMonster.bind(this)
      );

      this.spawners[spawner.id] = spawner;
    }
  }

  spawnPlayer() {
    const location = this.playerLocations[getRandomInt(this.playerLocations.length)];
    this.scene.events.emit('spawnPlayer', location);
  }

  updateLocation(arr, name) {
    return arr.map((obj) => {
      const id = obj.properties.spawner;
      return name[id]
        ? name[id].push([obj.x + obj.width / 2, obj.y - obj.height / 2])
        : (name[id] = [[obj.x + obj.width / 2, obj.y - obj.height / 2]]);
    });
  }
}

export default GameManager;
