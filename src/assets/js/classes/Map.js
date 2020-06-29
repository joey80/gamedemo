class Map {
  constructor(scene, key, tileSetName, bgLayerName, blockedLayerName) {
    this.bgLayerName = bgLayerName; // the name of the layer created in tiled
    this.blockedLayerName = blockedLayerName; // the name of the blocked layer created in tiled
    this.key = key; // Tiled JSON file key name
    this.scene = scene;
    this.tileSetName = tileSetName; // Tiled tileset image key name

    this.createMap();
  }

  createMap() {
    this.map = this.scene.make.tilemap({ key: this.key });
    this.tiles = this.map.addTilesetImage(this.tileSetName, this.tileSetName, 32, 32, 1, 2);
    this.backgroundLayer = this.map.createStaticLayer(this.bgLayerName, this.tiles, 0, 0);
    this.blockedLayer = this.map.createStaticLayer(this.blockedLayerName, this.tiles, 0, 0);
    this.backgroundLayer.setScale(2);
    this.blockedLayer.setScale(2);
    this.blockedLayer.setCollisionByExclusion([-1]);

    // update world bounds
    this.scene.physics.world.bounds.width = this.map.widthInPixels * 2;
    this.scene.physics.world.bounds.height = this.map.heightInPixels * 2;
    // limit camera to world bounds
    this.scene.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels * 2,
      this.map.heightInPixels * 2
    );
  }
}

export default Map;
