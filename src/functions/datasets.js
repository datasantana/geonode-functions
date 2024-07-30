import axios from 'axios';

class Datasets {
    constructor() {
        this.datasets = [];
    }

    async fetchDatasetsFromGeoNode(url, maplayers) {
        console.log(`Fetching datasets from GeoNode: ${url}`);
        try {
            let allFetchedDatasets = [];
            let page = 1;
            const pageSize = 10; // Assuming the default page size is 10
    
            // Fetch the first page using the provided URL
            let response = await axios.get(url);
            const totalDatasets = response.data.total;
    
            // Append the first batch of datasets
            allFetchedDatasets = allFetchedDatasets.concat(response.data.datasets);
    
            // Continue fetching until all datasets are retrieved
            while (allFetchedDatasets.length < totalDatasets) {
                page++;
                response = await axios.get(`${url}?page=${page}&page_size=${pageSize}`);
                allFetchedDatasets = allFetchedDatasets.concat(response.data.datasets);
            }
    
            const fetchedDatasets = allFetchedDatasets.map(dataset => {
                return {
                    pk: dataset.pk,
                    alternate: dataset.alternate,
                    title: dataset.title,
                    category: dataset.category,
                    default_style: dataset.default_style,
                    featureinfo_custom_template: dataset.featureinfo_custom_template,
                    links: dataset.links,
                    perms: dataset.perms,
                    styles: dataset.styles,
                    has_time: dataset.has_time,
                    ptype: dataset.ptype,
                };
            });
    
            const maplayerDatasetPks = maplayers.map(layer => String(layer.dataset.pk));
            this.datasets = fetchedDatasets.filter(dataset => !maplayerDatasetPks.includes(String(dataset.pk)));
    
            console.log(`${this.datasets.length} datasets available`);
        } catch (error) {
            console.error('Error fetching datasets:', error);
        }
    }

    getDatasets() {
        return this.datasets;
    }
}

export { Datasets };