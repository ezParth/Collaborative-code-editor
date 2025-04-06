import { client } from "../../config/db";

const InsertUser = async (username: string, email: string, password: string) => {
    const query = `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

    try {
        const result = await client.query(query, [username, email, password]);
        console.log("USER INSERTED SUCCESSFULLY: ", result.rows[0]);
    } catch (error) {
        console.error("Error Inserting the User: ", error);
    }
}

export default InsertUser;
