import {client} from "../../config/db"

const FetchByUsername =  async (username: string) => {
    const query = `SELECT * FROM users WHERE username = $1`;
    try {
        const result = await client.query(query, [username]);
        if(result.rows.length === 0){
            console.log("User not found with that username");
            return { success: false, message: "User not found with that Username" }
        }else{
            console.log("USER FOUND SUCCESSFULLY: ", result.rows[0]);
            return { success: true, user: result.rows[0], message: "User retrived successfully!" }
        }
    } catch (error) {
        console.error("ERROR DURING FETCHING USER BY USERNAME: ", error);
    }
}

export default FetchByUsername;
