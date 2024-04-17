/*
* A file to connect to the database and test that connection
*/
import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Start the app up on specified port
const app = express();
const PORT = process.env.PORT;

const connectionString = process.env.MONGODB_CONNECTION_STRING;


// Endpoint to test database connectivity
app.get('/dbname', async (req, res) => {
    const client = new MongoClient(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    try {
        await client.connect();
        // Get list of all databases under admin account
        const databases = await client.db().admin().listDatabases();
        console.log('Databases:', databases.databases.map(db => db.name));
        const dbNames = databases.databases.map(db => db.name);
        res.send(`Connected to the databases: ${dbNames}`);
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).send('Error connecting to the database.');
    } finally {
        await client.close();
    }
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});