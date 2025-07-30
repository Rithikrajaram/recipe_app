import {neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { ENV } from "../config/env.js";
import * as schema from "../db/schema.js";
const sql = neon(ENV.DB_URL);
export const db = drizzle(sql, {schema});