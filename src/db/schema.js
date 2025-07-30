import {pgTable, serial, text, timestamp, varchar} from "drizzle-orm/pg-core";
export const favTable = pgTable("fav", {
    id: serial("id").primaryKey(),
    userId: varchar("user_id").notNull(),
    recipeId: varchar("recipe_id").notNull(),
    title : text("title").notNull(),
    image : text("image").notNull(), 
    cooktime : text("cooktime").notNull(),
    servings : text("servings").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});