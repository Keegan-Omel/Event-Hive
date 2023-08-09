const db = require("../config/connection");
const { User, Event } = require("../models");
const userData = require("./userData.json");
const eventData = require("./eventData.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await Event.deleteMany({});

    const users = await User.create(userData);

    const eventsWithUserReferences = eventData.map(event => {
      const user = users.find(user => user.username === event.user);
      return { ...event, user: user._id };
    });

    await Event.insertMany(eventsWithUserReferences);

    console.log("Users and Events seeded!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
});

