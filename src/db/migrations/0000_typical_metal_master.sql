CREATE TABLE "fav" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar NOT NULL,
	"recipe_id" varchar NOT NULL,
	"title" text NOT NULL,
	"image" text NOT NULL,
	"cooktime" text NOT NULL,
	"servings" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
