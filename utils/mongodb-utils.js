//mongodb-utils.js

import { MongoClient } from "mongodb";

const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.t9cojsf.mongodb.net/?retryWrites=true&w=majority`;
const mongodb = process.env.MONGODB_DATABASE;

/**
 * Connects to the MongoDB database.
 * @returns {Promise<MongoClient>} A Promise that resolves to a MongoClient instance.
 */

export async function connectToDb() {
    const client = await MongoClient.connect(connectionString, {
        useNewUrlParser: true,  // Add any additional connection options here
    });
    return client;
}

/**
 * Retrieves a paginated list of recipes from a MongoDB collection.
 * @param {MongoClient} client - The MongoDB client.
 * @param {string} collection - The name of the collection to query.
 * @param {Object} sort - The sorting criteria for the recipes.
 * @param {number} pageNumber - The page number to retrieve (1-based).
 * @param {Object} filter - The filter criteria for the recipes.
 * @returns {Promise<Array>} A Promise that resolves to an array of recipe documents.
 */

export async function getAllRecipes(client, collection, sort, pageNumber, filter = {}) {
    const pageSize = 20;
    const skipPage = (pageNumber - 1) * pageSize;

    const db = client.db(mongodb);

    const documents = await db
        .collection(collection)
        .find(filter)
        .sort(sort)
        .skip(skipPage)
        .limit(pageSize)
        .toArray();

    return documents;
}
