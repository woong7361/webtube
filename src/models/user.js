import bcrypt from "bcrypt"
import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    avatarUrl: {type: String},
    name: {type: String, reuired: true},
    username: {type:String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String},
    socialOnly: {type: Boolean, defalut: false},
    location: {type: String},
})

userSchema.pre("save",async function() { //middleware before save database
    this.password = await bcrypt.hash(this.password, 5);
    //hashing the password before save the data in database
});

const User = mongoose.model("User",userSchema);
export default User;
