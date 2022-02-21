// Dependencies
import app from './server.js';
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import TasksDAO from './dao/tasksDAO.js';

async function main() {
    dotenv.config();

    // Create new MongoDB Client
    const client = new mongodb.MongoClient(
            process.env.ATLAS_URI, 
            {useNewUrlParser: true, useUnifiedTopology: true}
    );

    // Set PORT from .env or 4444 if not assigned
    const PORT = process.env.PORT || 4444;

    try {
        // Connect the MongoDB Client using TasksDAO injectDB method wich will connect to the db and the appropriate collection
        await client.connect();
        await TasksDAO.injectDB(client);

        // Add a port listener to the app
        app.listen(PORT, () => {
            console.log(`Nomming on port: ${PORT}`);
        })
    }
    catch(err) {
        console.error(err);
        process.exit(1);
    }
}

// Run the main function and catch any errors that were generated
main().catch(console.error);