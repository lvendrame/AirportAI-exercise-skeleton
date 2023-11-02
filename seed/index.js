const mongooseSetup = require('../server/setup/mongoose');
const seedAgents = require('./agents-seed');
const seedProducts = require('./products-seed');

async function seed() {
    await mongooseSetup();

    console.log("Seeding the database...");

    await seedAgents();
    await seedProducts();

    console.log("Seeding finished!");
    await process.exit();
}

seed();