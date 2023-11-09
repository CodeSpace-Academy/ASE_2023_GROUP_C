import { MongoClient, ObjectId } from "mongodb";

const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.t9cojsf.mongodb.net/?retryWrites=true&w=majority`;
const mongodb = process.env.MONGODB_DATABASE;

/**
 * Connects to the MongoDB database.
 */

const client = await MongoClient.connect(connectionString, {
    useNewUrlParser: true,  // Add any additional connection options here
});

export async function getDocumentSize(collection) {
    const db = client.db(mongodb)
    const count = db.collection(collection).countDocuments()
    return count
}

/**
 * Retrieves a paginated list of recipes from a MongoDB collection.
 * @param {string} collection - The name of the collection to query.
 * @param {Object} sort - The sorting criteria for the recipes.
 * @param {number} pageNumber - The page number to retrieve (1-based).
 * @param {Object} filter - The filter criteria for the recipes.
 * @returns {Promise<Array>} A Promise that resolves to an array of recipe documents.
 */

export async function getAllRecipes(collection, sort, pageNumber, filter = {}) {
    const pageSize = 50;
    const skipPage = (pageNumber - 1) * pageSize;

    const db = client.db(mongodb);
    
    const documents = await db
        .collection(collection)
        .find(filter)
        .sort(sort)
        .skip(skipPage)
        .limit(pageSize)
        .toArray();
    console.log(filter)
    return documents;
}

/**
 * Retrieves a recipe document from a MongoDB collection based on a unique identifier.
 * @param {string} collection - The name of the collection to query.
 * @param {object} uniqueIdentifier - The unique identifier for the recipe to retrieve.
 * @returns {Promise<object|null>} A Promise that resolves to the recipe document, or null if not found.
 */

export async function getRecipeDetails(collection, uniqueIdentifier) {
    const db = client.db(mongodb);
    
    const document = await db
        .collection(collection)
        .findOne(uniqueIdentifier)
    
    return document
}

/**
 * Retrieves a list of allergens from a MongoDB collection.
 * @param {string} collection - The name of the collection to query.
 * @param {object} [filter={}] - An optional filter object to narrow down the query.
 * @returns {Promise<Array>} A Promise that resolves to an array of item documents.
 */

export async function getAllergens(collection, filter = {}) {
    const db = client.db(mongodb);
    
    const documents = await db
      .collection(collection)
      .find(filter)
      .toArray();
  
    return documents;
}


/**
 * Retrieves a list of recipe categories from a MongoDB collection.
 * @param {string} collection - The name of the collection to query.
 * @param {object} [filter={}] - An optional filter object to narrow down the query.
 * @returns {Promise<Array>} A Promise that resolves to an array of item documents.
 */

export async function getCategories(collection, filter = {}) {
    const db = client.db(mongodb);
    
    const documents = await db
      .collection(collection)
      .find(filter)
      .toArray();

    return documents;
}
/**
 * Check if a document exist in a collection in MongoDB.
 * @param {string} collection - The name of the collection to insert into.
 * @returns {Promise} A Promise that resolves when the insertion is complete.
 */

export async function lookforDocument(filter) {
    const db = client.db(mongodb);

    const result = await db
        .collection('users-list')
        .findOne(filter)

    return result;
}


/**
 * Inserts a document into a MongoDB collection.
 * @param {string} collection - The name of the collection to insert into.
 * @param {object} document - The document to be inserted.
 * @returns {Promise} A Promise that resolves when the insertion is complete.
 */

export async function insertDocument(collection, document) {
    const db = client.db(mongodb);
   
    const result = await db
        .collection(collection)
        .insertOne(document);
  
    return result;
}

/**
 * Inserts a document into a MongoDB collection.
 * @param {string} collection - The name of the collection to insert into.
 * @param {string} username - The name of the collection to insert into.
 * @param {object} filter - The document to be inserted.
 * @returns {Promise} A Promise that resolves when the insertion is complete.
 */

export async function updateUsersList(collection, username, filter) {
    const db = client.db(mongodb);
  
    const result = await db
        .collection(collection)
        .updateOne(
            { userName: username},
            filter
        );
  
    return result;
}


/**
 * Retrieve a fovourite recipe into a MongoDB collection.
 * @param {string} collection - The name of the collection to insert into.
 * @param {object} username - The document to be inserted.
 * @returns {Promise} A Promise that resolves when the insertion is complete.
 */

export async function getFavouriteRecipes(collection, filter = {}) {    
    const db = client.db(mongodb);
   
    const documents = await db
        .collection(collection)
        .findOne(filter)

    return documents;
}

/**
 * Retrieves a paginated list of recipes from a MongoDB collection.
 * @param {string} collection - The name of the collection to query.
 * @param {Object} sort - The sorting criteria for the recipes.
 * @param {number} pageNumber - The page number to retrieve (1-based).
 * @param {Object} filter - The filter criteria for the recipes.
 * @returns {Promise<Array>} A Promise that resolves to an array of recipe documents.
 */

export async function getRecipes(collection, sort, pageNumber, filter = {}) {
    const pageSize = 100;
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

/**
 * Retrieves a paginated list of recipes from a MongoDB collection.
 * @param {string} collection - The name of the collection to query.
 * @param {Object} filter - The filter criteria for the recipes.
 * @returns {Promise<Array>} A Promise that resolves to an array of recipe documents.
 */

export async function getByAggregation(collection, filter) {
    const db = client.db(mongodb);
    
    const documents = await db
      .collection(collection)
      .aggregate(filter)
      .toArray();

    return documents;
}