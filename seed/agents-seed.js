const { getPasswordHash } = require('../server/utils/auth');
const Agent = require('../server/models/agent');

module.exports = async function insertAgents() {
    const agents = [
        {
            username: "lvendrame",
            email: "lvendrame@airport.com",
            password: "lvendrame01",
            name: "Luís Vendrame"
        },
        {
            username: "fpereira",
            email: "fpereira@airport.com",
            password: "fpereira01",
            name: "Filipe Pereira"
        },
        {
            username: "agenttest",
            email: "agenttest@airport.com",
            password: "agenttest01",
            name: "Agent Test"
        }
    ];

    console.log("Deleting all agents...");
    try {
        await Agent.deleteMany({});
        console.info("The agents were deleted successfully!");
    } catch (error) {
        console.error('There was an error when trying to delete the agents. Error: ' + error);
    }

    console.log("Inserting agents...");
    try {
        await Agent.insertMany(agents.map(agent => {
            agent.password = getPasswordHash(agent.password);
            return agent;
        }));
        console.info("The agents were inserted successfully!");
    }
    catch (error) {
        console.error('There was an error when trying to insert the agents. Error: ' + error);
    }
};