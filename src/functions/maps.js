import axios from 'axios';

class Maps {
    constructor() {
        this.maps = [];
    }

    async fetchMapsFromGeoNode(url) {
        console.log(`Fetching maps from GeoNode: ${url}`);
        try {
            const response = await axios.get(url);
            const data = response.data;
            const length = data.total;
            console.log(`${length} maps fetched`);

            this.maps = data.maps.map(map => ({
                pk: map.pk,
                title: map.title,
                raw_abstract: map.raw_abstract,
                raw_purpose: map.raw_purpose,
                resource_type: map.resource_type,
                thumbnail_url: map.thumbnail_url,
                link: map.link,
                links: map.links,
                attribution: map.attribution,
                category: map.category,
                regions: map.regions,
                state: map.state,
                maplayers: map.maplayers,
                last_updated: map.last_updated
            }));
            //console.log(this.maps); // Uncomment to see the maps for debugging
        } catch (error) {
            console.error('Failed to fetch maps from GeoNode:', error);
        }
    }
}

export default Maps;