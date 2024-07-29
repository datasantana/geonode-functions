class MapDetails {
    constructor(pk, maps) {
        this.pk = pk;
        this.title = null;
        this.links = null;
        this.maplayers = null;

        this.setMapDetails(maps);
    }

    setMapDetails(maps) {
        const map = maps.find(map => map.pk === this.pk);
        if (map) {
            this.title = map.title;
            this.links = map.links;
            this.maplayers = map.maplayers;
        } else {
            console.error(`Map with pk ${this.pk} not found.`);
        }
    }
}

export { MapDetails };