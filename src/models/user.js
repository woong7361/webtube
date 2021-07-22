import bcrypt from "bcrypt"
import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    avatarUrl: {type: String, default: ""},
    name: {type: String, reuired: true},
    username: {type:String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String},
    socialOnly: {type: Boolean, default: false},
    location: {type: String},
    comments: [{type: mongoose.Schema.Types.ObjectId , ref:"Comment"}],
    videos: [{type: mongoose.Schema.Types.ObjectId , ref:"video"}],
})

userSchema.pre("save",async function() { //middleware before save database
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 5);
        //hashing the password before save the data in database
    }
});

const User = mongoose.model("User",userSchema);
export default User;
