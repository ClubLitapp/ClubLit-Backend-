import express from 'express';
import mongoose from 'mongoose';
import routes from './lib/routes.js';
import dotenv from 'dotenv';
import * as fs from 'fs';

// Load environment variables from the .env file
dotenv.config();

const app = express();




const PORT = process.env.PORT;

// Connect to MongoDB
const connectionString = process.env.MONGODB_CONNECTION_STRING;

if (!connectionString) {
    console.error('MONGODB_CONNECTION_STRING is not set in the environment variables.');
    process.exit(1);
}

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


// Use routes
app.use('/', routes);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || 'An error occurred' });
});
const path = 'lib/utils/speech-to-text/speech-to-text-key.json';

//Function to reset private keys in the JSON file
function resetPrivateKeys() {
    let rawdata = fs.readFileSync(path);
    let config = JSON.parse(rawdata);

    // Reset private_key_id and private_key
    config.private_key_id = null;
    config.private_key = null;

    // Write the updated config back to the file
    fs.writeFileSync(path, JSON.stringify(config, null, 2));
    console.log("private keys reset!");
}


// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

export { app };




