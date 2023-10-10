import { MongoClient } from "mongodb";

const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.17rztfq.mongodb.net/?retryWrites=true&w=majority`
const mongodb = process.env.mongodb_database

/**
 * Connects to the MongoDB database.
 * @returns {Promise<MongoClient>} A Promise that resolves to a MongoClient instance.
 */

export async function connectToDb() {
    const client = await MongoClient.connect(connectionString)
    return client
}

export async function getAllRecipes(client, collection, sort, filter = {}) {
    const db = client.db(mongodb);

    const pageSize = 20;
    const pageNumber = 1;
    const skipPage = (pageNumber - 1) * pageSize;

    const documents = await db
        .collection(collection)
        .find(filter)
        .sort(sort)
        .skip(skipPage)
        .limit(pageSize)    
        .toArray();
    return documents;
}

// /**
//  * Retrieves a paginated list of recipes from a MongoDB collection.
//  * @param {MongoClient} client - The MongoDB client.
//  * @param {string} collection - The name of the collection to query.
//  * @param {Object} sort - The sorting criteria for the recipes.
//  * @param {Object} filter - The filter criteria for the recipes.
//  * @param {number} pageSize - The number of recipes to retrieve per page.
//  * @param {number} pageNumber - The page number to retrieve (1-based).
//  * @returns {Promise<Array>} A Promise that resolves to an array of recipe documents.
//  * @throws {Error} If an error occurs during the database query.
//  */

// export async function getAllRecipes(client, collection, sort, filter, pageSize, pageNumber) {
//     const db = client.db(mongodb);

//     const skipPage = (pageNumber - 1) * pageSize;
//     const documents = await db
//         .collection(collection)
//         .find(filter)
//         .sort(sort)
//         .skip(skipPage)
//         .limit(pageSize)
//         .toArray();

//     return documents;
// }