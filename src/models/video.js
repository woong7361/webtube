import  mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: String,  // Sting = {type: String} 같다
    description: String,
    createdAt: {
        type: Date, 
        required: true,
        default: Date.now
    },
    hashtags: [{type: String}],
    meta: {
        views: {type: Number},
        rating: Number,
    },
});

const movieModel = mongoose.model("video", videoSchema);
export default movieModel

