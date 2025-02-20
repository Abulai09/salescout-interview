// Write a script that:
// 1. Connects to Redis.
// 2. Saves the keys with their values.
// 3. Reads and outputs values for a given key.

// Use redis library

const { createClient } = require("redis");

async function manageRedis(): Promise<void> {
    const client = createClient();

    client.on("error", (err:Error) => console.error("Redis Client Error", err));

    await client.connect();
    console.log("Connected to Redis");

    try {
        await client.set("name", "Alice");
        await client.set("age", "30");
        console.log("Data saved to Redis");

        const name = await client.get("name");
        const age = await client.get("age");
        console.log(`name: ${name}, age: ${age}`);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.disconnect();
        console.log("Disconnected from Redis");
    }
}

module.exports = { manageRedis };
