import  mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    createdAt: {
        type: Date, 
        required: true,
        default: Date.now
    },
    hashtags: [{type: String, trim: true}],
    meta: {
        views: {type: Number, default: 0, required: true},
        rating: {type: Number, required: true, default: 0}
    },
});

// mongoose middleware - pre(before) 'save' running function first
// 'this' is like pyhthon self
// videoSchema.pre('save', async function() {
//     this.hashtags = this.hashtags[0]
//     .split(",")
//     .map((word) => (word.startsWith("#") ? word : `#${word}`));
// });

//static function like as add a method in python using Object.functionname()
//ex) videoSchema.formatHashtags(hashtags)
videoSchema.static("formatHashtags",function(hashtags){
    return hashtags.split(",").map((word) => word.startsWith("#") ? word : `#${word}`)
})


const movieModel = mongoose.model("video", videoSchema);
export default movieModel

