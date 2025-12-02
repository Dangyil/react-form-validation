import mongoose from "mongoose";  
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter username"],
            unique: true,
            lowercase: true,
            trim: true,
            minLength: [3, "Username must be at least 3 characters long"],
            maxLength: [30, "Username cannot exceed 30 characters"]
        },
        email: {
            type: String,
            required: [true, "Please enter email"],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, "Please enter password"],
            minLength: [6, "Password must be at least 6 characters long"]
        }
    },
    { timestamps: true }
);
//hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next(); 
});

//compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


const User = mongoose.model("User", userSchema);
export default User;
    