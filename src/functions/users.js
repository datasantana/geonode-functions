import axios from "axios";

class Users {
    constructor() {
        this.users = [];
    }

    async fetchUsersFromGeoNode(url) {
        console.log(`Fetching users from GeoNode: ${url}`);
        try {
            const response = await axios.get(url);
            const data = response.data;
            const length = data.total;
            console.log(`${length} users fetched`);

            this.users = data.users.map(user => ({
                pk: user.pk,
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                date_joined: user.date_joined
            }));
            //console.log(this.users); // Uncomment to see the users for debugging
        } catch (error) {
            console.error("Failed to fetch users from GeoNode:", error);
        }
    }
}

export default Users;