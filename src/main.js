import Maps from './functions/maps.js';
import { MapDetails } from './functions/mapDetails.js';
import { MapLayers } from './functions/mapLayers.js';
import { Datasets } from './functions/datasets.js';
import readline from 'readline';

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Helper functions to prompt the user for input
async function promptUserForMapPk() {
    return new Promise((resolve) => {
        rl.question('Enter the pk of the map you want to view: ', (answer) => {
            resolve(answer);
        });
    });
}

async function promptUserForAction() {
    console.log('Choose an action:');
    console.log('0: select_new_map');
    console.log('1: add_layer');
    console.log('2: remove_layer');

    return new Promise((resolve) => {
        rl.question('Enter the number of the action you want to perform: ', (answer) => {
            switch (answer) {
                case '0':
                    resolve('select_new_map');
                    break;
                case '1':
                    resolve('add_layer');
                    break;
                case '2':
                    resolve('remove_layer');
                    break;
                default:
                    console.log('Invalid option. Please enter 0, 1, or 2.');
                    resolve(promptUserForAction());
                    break;
            }
        });
    });
}

async function promptUserForDatasetPk() {
    return new Promise((resolve) => {
        rl.question('Enter the pk of the dataset you want to add as a layer: ', (answer) => {
            resolve(answer);
        });
    });
}

async function promptUserForLayerPk() {
    return new Promise((resolve) => {
        rl.question('Enter the pk of the layer you want to remove: ', (answer) => {
            resolve(answer);
        });
    });
}

async function runApp() {
    const apiURL = 'https://geostudio-datastore.eastus.cloudapp.azure.com/api/v2/';
    const mapsEndpoint = 'maps/';
    const datasetsEndpoint = 'datasets/';
    // const categoriesEndpoint = 'categories/';
    
    const mapsInstance = new Maps();
    await mapsInstance.fetchMapsFromGeoNode(`${apiURL}${mapsEndpoint}`); // Replace with actual URL

    while (true) {
        // Log the title and pk of every map in maps
        mapsInstance.maps.forEach(map => {
            console.log(`${map.title} - with pk: ${map.pk}`);
        });

        // Prompt the user for a specific map pk
        const specificMapPk = await promptUserForMapPk();
        const mapDetails = new MapDetails(specificMapPk, mapsInstance.maps);

        // Show selected map title and number of layers
        console.log(`Selected map: ${mapDetails.title}`);
        console.log(`Number of layers: ${mapDetails.maplayers.length}`);

        const mapLayers = new MapLayers(mapDetails);

        while (true) {
            console.log(mapLayers);// uncomment for debugging

            // Log the layers of the selected map
            console.log('Current layers in the map:');
            mapLayers.layers.forEach(layer => {
                console.log(`${layer.dataset.title} - with pk: ${layer.dataset.pk}`);
            });

            // Provide options for selecting a new map or adding/removing layers
            const action = await promptUserForAction();

            if (action === 'select_new_map') {
                break; // Exit the inner loop to select a new map
            } else if (action === 'add_layer') {
                // Fetch available datasets
                const datasetsInstance = new Datasets();
                await datasetsInstance.fetchDatasetsFromGeoNode(`${apiURL}${datasetsEndpoint}`, mapLayers.layers);

                // Log available datasets
                console.log('Available datasets:');
                datasetsInstance.datasets.forEach(dataset => {
                    console.log(`${dataset.title} - with pk: ${dataset.pk}`);
                });

                // Prompt the user for a dataset pk to add as a layer
                const datasetPk = await promptUserForDatasetPk();
                // Extract the dataset object from the datasets array
                const dataset = datasetsInstance.datasets.find(dataset => dataset.pk === datasetPk);
                if (!dataset) {
                    console.log('Invalid dataset pk. Please try again.');
                    continue;
                } else {
                    console.log(`Adding dataset ${dataset.title} as a layer`);
                }

                // Add the selected dataset as a layer
                mapLayers.addLayer(dataset);
            } else if (action === 'remove_layer') {
                // Prompt the user for a map layer pk to remove
                const layerPk = await promptUserForLayerPk();
                await mapLayers.removeLayer(layerPk);
            }
        }
    }
    
}

// Start the application
runApp().catch((error) => {
    console.error(error);
}).finally(() => {
    rl.close(); // Ensure the readline interface is closed on error or when the application exits
});