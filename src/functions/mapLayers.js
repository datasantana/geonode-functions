class MapLayers {
    constructor(map) {
        this.maplayers = map.maplayers || [];
    }

    getMapLayers() {
        return this.maplayers;
    }
}

export { MapLayers };