const mongoose = require("mongoose");
const User = require("./models/User");
const Event = require("./models/Event");
const bcryptjs = require("bcryptjs");

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/eventhive", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Delete existing data
    await User.deleteMany();
    await Event.deleteMany();

    // Hash passwords
    const hashedPassword = await bcryptjs.hash("password123", 10);

    // Seed users
    const users = await User.insertMany([
      {
        username: "user1",
        email: "user1@example.com",
        password: hashedPassword,
      },
      {
        username: "user2",
        email: "user2@example.com",
        password: hashedPassword,
      },
    ]);
    console.log("Users seeded:", users);

    // Seed events
    const events = await Event.insertMany([
      {
        title: "Event 1",
        description: "Description of Event 1",
        cost: 10,
        location: "Location 1",
        user: users[0]._id,
        date: new Date("2023-08-20"),
        seating: 50,
      },
      {
        title: "Event 2",
        description: "Description of Event 2",
        cost: 20,
        location: "Location 2",
        user: users[1]._id,
        date: new Date("2023-09-05"),
        seating: 30,
      },
      {
        title: "Event 3",
        description: "Description of Event 3",
        cost: 15,
        location: "Location 3",
        user: users[0]._id,
        date: new Date("2023-10-15"),
        seating: 25,
      },
    ]);
    console.log("Events seeded:", events);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
