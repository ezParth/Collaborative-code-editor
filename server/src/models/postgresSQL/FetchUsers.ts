import { client } from "../../config/db"

const FetchUsers = async () => {
    const query = `SELECT * FROM users;`
    try {
        const result = await client.query(query);
        console.log("Users: ", result.rows);
    } catch (error) {
        console.error("ERROR DURING FETCHING THE USERS: ", error)
    }
}

export default FetchUsers;
