import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favTable } from "./db/schema.js"; 
import { eq, and } from 'drizzle-orm';

const app = express();
const PORT = ENV.PORT || 8001;

app.use(express.json());


app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Server is running" });
});


app.post("/api/fav", async (req, res) => {
    try {
        const { userId, recipeId, title, image, cooktime, servings } = req.body;

        if (!userId || !recipeId || !title) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newFav = await db.insert(favTable).values({
            userId,
            recipeId,
            title,
            image,
            cooktime,
            servings    
        }).returning();

        res.status(201).json(newFav[0]);

    } catch (error) {
        console.error("Error adding favorite:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
app.get("/api/fav/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const favorites = await db.select().from(favTable).where(eq(favTable.userId, userId));

        if (favorites.length === 0) {
            return res.status(404).json({ message: "No favorites found for this user" });
        }

        res.status(200).json(favorites);
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
);  
app.delete("/api/fav/:userId/:recipeId", async (req, res) =>{
    try{
        const { userId, recipeId } = req.params;
        await db.delete(favTable)
            .where(and(eq(favTable.userId, userId), eq(favTable.recipeId, recipeId)));
            res.status(200).json({ message: "Favorite removed successfully" });
    }catch(error){
         console.error("Error removing favorite:", error);
        res.status(500).json({ message: "Internal server error" });
    }
} );
    

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
