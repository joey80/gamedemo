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

  setupSpawners() {}

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
