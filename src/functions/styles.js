import axios from "axios";

class Styles {
    constructor() {
        this.styles = [];
    }

    async fetchStylesFromGeoNode(url) {
        console.log(`Fetching styles from GeoNode: ${url}`);
        try {
            const response = await axios.get(url);
            const data = response.data;
            const length = data.total;
            console.log(`${length} styles fetched`);

            this.styles = data.styles.map(style => ({
                pk: style.pk,
                title: style.title,
                description: style.description,
                parent: style.parent,
                children: style.children,
                last_updated: style.last_updated
            }));
            //console.log(this.styles); // Uncomment to see the styles for debugging
        } catch (error) {
            console.error("Failed to fetch styles from GeoNode:", error);
        }
    }

    addStyle(style) {
        this.styles.push(style);
    }

    removeStyle(pk) {
        this.styles = this.styles.filter(style => style.pk !== pk);
    }
}

export default Styles;