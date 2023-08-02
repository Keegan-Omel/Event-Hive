// IMPORT MONGOOSE PACKAGE FOR WORKING WITH MONGODB DATABASE
const mongoose = require("mongoose");

// IMPORT BCRYPTJS PACKAGE FOR PASSWORD HASHING AND COMPARISON
const bcryptjs = require("bcryptjs");

// DEFINE THE SCHEMA FOR THE USER MODEL
const userSchema = new mongoose.Schema(
  {
    // USERNAME OF THE USER
    username: {
      type: String,
      required: true, // USERNAME IS REQUIRED
      unique: true, // USERNAME MUST BE UNIQUE
      trim: true, // REMOVE EXTRA SPACES FROM USERNAME
    },
    // EMAIL ADDRESS OF THE USER
    email: {
      type: String,
      required: true, // EMAIL ADDRESS IS REQUIRED
      unique: true, // EMAIL ADDRESS MUST BE UNIQUE
      validate: {
        // VALIDATE THE EMAIL ADDRESS FORMAT USING REGULAR EXPRESSION
        validator: function (value) {
          return /^\S+@\S+\.\S+$/.test(value);
        },
        //message: "Invalid email address",
      },
    },
    // PASSWORD OF THE USER
    password: {
      type: String,
      required: true, // PASSWORD IS REQUIRED
      minlength: 8, // PASSWORD MUST HAVE AT LEAST 8 CHARACTERS
    },
    // EVENTS ASSOCIATED WITH THE USER (AN ARRAY OF EVENT OBJECT IDS)
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event", // REFERENCING THE "Event" MODEL
      },
    ],
  },
  {
    timestamps: false, // DISABLE AUTOMATIC TIMESTAMP GENERATION
    versionKey: false, // DISABLE THE __v FIELD
  }
);

// MIDDLEWARE FUNCTION TO HASH THE PASSWORD BEFORE SAVING THE USER TO DATABASE
userSchema.pre("save", async function (next) {
  // CHECK IF THE PASSWORD IS NOT MODIFIED (e.g., in an update operation)
  if (!this.isModified("password")) {
    return next(); // IF NOT MODIFIED, SKIP THE HASHING AND PROCEED
  }
  const salt = await bcryptjs.genSalt(10); // GENERATE A SALT FOR HASHING
  this.password = await bcryptjs.hash(this.password, salt); // HASH THE PASSWORD USING THE SALT
  next(); // CALL THE NEXT FUNCTION TO CONTINUE THE SAVE OPERATION
});

// METHOD TO COMPARE THE LOGIN PASSWORD WITH THE USER'S HASHED PASSWORD
userSchema.methods.checkPassword = async function (loginPw) {
  return await bcryptjs.compare(loginPw, this.password); // COMPARE THE HASHED PASSWORDS
};

// CREATE THE "User" MODEL USING THE SCHEMA
const User = mongoose.model("User", userSchema);

// EXPORT THE "User" MODEL
module.exports = User;


