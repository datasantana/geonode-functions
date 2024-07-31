class MapLayers {
    constructor(map) {
        this.layers = map.maplayers || [];
    }

    getMapLayers() {
        return this.layers;
    }

    // add a new layer to maplayers using a daatset object and setting the default values
    addLayer(dataset) {
        // find the max order value in the maplayers array
        let maxOrder = 0;
        this.layers.forEach(layer => {
            if (layer.order > maxOrder) {
                maxOrder = layer.order;
            }
        });

        // add the new layer to the maplayers array
        this.layers.push({
            pk: parseInt(dataset.pk),
            current_style: dataset.default_style,
            extra_params: [],
            name: dataset.alternate,
            dataset: dataset,
            order: maxOrder + 1,
            visibility: true,
            opacity: 1
        });
    }

}

export { MapLayers };