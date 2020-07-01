import Spawner from '../game_manager/Spawner';
import { getRandomInt } from '../../lib/util';

class GameManager {
  constructor(scene, mapData) {
    this.scene = scene;
    this.mapData = mapData;

    this.spawners = {};
    this.chests = {};

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

  addChest(id, chest) {
    this.chests[id] = chest;
  }

  deleteChest() {}

  parseMapData() {
    this.mapData.map((elm) => {
      switch (elm.name) {
        case 'player_locations': {
          return (this.playerLocations = elm.objects.map((obj) => [obj.x, obj.y]));
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

  setupEventListeners() {}

  setupSpawners() {
    for (const key of Object.keys(this.chestLocations)) {
      const config = {
        spawnInterval: 3000,
        limit: 3,
        spawnerType: 'CHEST',
        id: `chest-${key}`,
      };

      const spawner = new Spawner(
        config,
        this.chestLocations[key],
        this.addChest.bind(this),
        this.deleteChest.bind(this)
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
      return name[id] ? name[id].push([obj.x, obj.y]) : (name[id] = [[obj.x, obj.y]]);
    });
  }
}

export default GameManager;
