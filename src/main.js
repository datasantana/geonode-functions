import Maps from './functions/maps.js';
import { MapDetails } from './functions/mapDetails.js';
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
    const specificPk = await promptUserForPk();
    const mapDetails = new MapDetails(specificPk, mapsInstance.maps);

    // log the title and links of the map with the specific pk and the length of the maplayers
    console.log(`Title: ${mapDetails.title}`);
    console.log(`Pk: ${mapDetails.pk}`);
    console.log(`Number of maplayers: ${mapDetails.maplayers.length}`);
}

runApp();