// Write a script that:
// 1. Connects to MongoDB.
// 2. Creates the 'users' collection.
// 3. Adds new users.
// 4. Finds users with duplicate emails.

// Use Mongoose library
const mongoose = require("mongoose");

type DuplicatedUsers = {
    email: string;
};

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
});

const User = mongoose.model("User", userSchema);

async function manageUsers(): Promise<DuplicatedUsers[]> {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB");

        await User.deleteMany({});
        console.log("🗑️ Cleared users collection");

        await User.insertMany([
            { name: "Alice", email: "alice@example.com" },
            { name: "Bob", email: "bob@example.com" },
            { name: "Charlie", email: "alice@example.com" }, 
        ]);
        console.log("Users added");

        const duplicates = await User.aggregate([
            { $group: { _id: "$email", count: { $sum: 1 } } },
            { $match: { count: { $gt: 1 } } },
            { $project: { _id: 0, email: "$_id" } },
        ]);

        console.log("🔍 Duplicate emails found:", duplicates);
        return duplicates;
    } catch (error) {
        console.error("Error:", error);
        return [];
    } finally {
        await mongoose.connection.close();
        console.log("Disconnected from MongoDB");
    }
}

module.exports = { manageUsers };
