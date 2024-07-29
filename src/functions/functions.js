import axios from 'axios';

const apiURL = 'https://geostudio-datastore.eastus.cloudapp.azure.com/api/v2/';
const mapsEndpoint = 'maps/';
const datasetsEndpoint = 'datasets/';
const categoriesEndpoint = 'categories/';

// Get maps from GeoNode API. Use this to render a map gallery in home page
async function getMaps() {
    const response = await axios.get(`${apiURL}${mapsEndpoint}`);
    //console.log(response.data);
    return response.data;
}

// Get a single map from GeoNode API. When a user clicks on a map, this function is called to get the map details
async function getMap(pk) {
    const response = await axios.get(`${apiURL}${mapsEndpoint}${pk}`);
    //console.log(response.data);
    return response.data;
}

// for every map in the list, get the pk, maplayers, title, raw_abstract, raw_purpose, attribution, srid, state, thumbnail_url, keywords, regions, category
async function mapDetails() {
    const maps = await getMaps();
    const mapDetails = maps.maps.map(async map => {
        const mapDetails = await getMap(map.pk);
        console.log(mapDetails);
        return mapDetails;
    });
}

mapDetails();


