import Maps from './functions/maps.js';
import { MapDetails } from './functions/mapDetails.js';
import { MapLayers } from './functions/mapLayers.js';
import { Datasets } from './functions/datasets.js';
import readline from 'readline';

// This function emulates the selection of a map by the user
async function promptUserForPk() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('Enter the pk of the map you want to view: ', (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

async function runApp() {
    const apiURL = 'https://geostudio-datastore.eastus.cloudapp.azure.com/api/v2/';
    const mapsEndpoint = 'maps/';
    const datasetsEndpoint = 'datasets/';
    const categoriesEndpoint = 'categories/';
    const mapsInstance = new Maps();
    await mapsInstance.fetchMapsFromGeoNode(`${apiURL}${mapsEndpoint}`); // Replace with actual URL

    // log the title and pk of every map in maps
    mapsInstance.maps.forEach(map => {
        console.log(`${map.title} - with pk: ${map.pk}`);
    });

    // Prompt the user for a specific pk
    const specificMapPk = await promptUserForPk();
    const mapDetails = new MapDetails(specificMapPk, mapsInstance.maps);

    // log the title and links of the map with the specific pk and the length of the maplayers
    console.log(`Title: ${mapDetails.title}`);
    console.log(`Pk: ${mapDetails.pk}`);
    console.log(`Number of maplayers: ${mapDetails.maplayers.length}`);

    // get layers from selected map
    const mapLayers = new MapLayers(mapDetails);
    const layers = mapLayers.getMapLayers();

    // log details of each layer
    layers.forEach(layer => {
        console.log(`Layer name: ${layer.name}, Layer Pk: ${layer.pk}, Layer order: ${layer.order}, Layer opacity: ${layer.opacity}`);
    });

    // get the available datasets
    const datasets = new Datasets();
    await datasets.fetchDatasetsFromGeoNode(`${apiURL}${datasetsEndpoint}`, layers);

    // log the title and pk of every dataset
    datasets.getDatasets().forEach(dataset => {
        console.log(`Dataset title: ${dataset.title} with pk: ${dataset.pk}`);
    });
}

runApp();