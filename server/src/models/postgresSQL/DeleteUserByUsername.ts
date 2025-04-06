import { client } from "../../config/db";

const DeleteUserByUsername = async (username: string) => {
    const query = `DELETE FROM users WHERE username = $1 RETURNING *;`;
    try {
        const result = await client.query(query, [username]);
        if (result.rows.length === 0) {
            console.log("No user found with that username to delete.");
            return false;
        } else {
            console.log("User deleted: ", result.rows[0]);
            return true;
        }
    } catch (error) {
        console.error("ERROR DURING DELETING THE USER: ", error);
        return false;
    }
};

export default DeleteUserByUsername;
