import { Client } from "faunadb";

export const faunaDBClient = new Client({
  secret: process.env.FAUNADB_KEY,
});
