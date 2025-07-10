import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    interests: {
      type: [String],
      required: true,
      default: [],
    },
    location: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      required: true,
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
   
  },

  { timestamps: true }
); // timestamps: true adds createdAt and updatedAt fields to the schema


//hashing password
userSchema.pre("save", async function (next) {   //before saving the user, hash the password
  if (!this.isModified("password")) return next();  //***important*** if the password is not modified, skip the hashing

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  const isPasswordCorrect = await bcrypt.compare(
    enteredPassword,
    this.password
  );
  return isPasswordCorrect;
};

const User = mongoose.model("User", userSchema);

export default User;
