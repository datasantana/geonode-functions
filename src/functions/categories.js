import axios from "axios";

class Categories {
    constructor() {
        this.categories = [];
    }

    async fetchCategoriesFromGeoNode(url) {
        console.log(`Fetching categories from GeoNode: ${url}`);
        try {
            const response = await axios.get(url);
            const data = response.data;
            const length = data.total;
            console.log(`${length} categories fetched`);

            this.categories = data.categories.map(category => ({
                pk: category.pk,
                title: category.title,
                description: category.description,
                parent: category.parent,
                children: category.children,
                last_updated: category.last_updated
            }));
            //console.log(this.categories); // Uncomment to see the categories for debugging
        } catch (error) {
            console.error("Failed to fetch categories from GeoNode:", error);
        }
    }
}

export default Categories;