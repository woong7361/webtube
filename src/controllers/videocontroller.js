import Video from "../models/video"

export const home = async(req,res) =>{
    // Video.find({},(error,videos) => {
    //     return res.render("home",{pageTitle: "Home", videos: videos});
    // })
    const videos = await Video.find({}).sort({createdAt: "asc"});
    return res.render("home",{pageTitle: "Home", videos: videos});
}
export const watch = async(req,res) =>{
    const {id} = req.params;
    const video = await Video.findOne({_id: id});
    if(video){
        return res.render("watch",{pageTitle: video.title, video: video});
    }
    else {return res.status(404).render("404",{pageTitle: "video not found"})}
}
export const getEdit = async(req,res)=>{
    const {id} = req.params;
    const video = await Video.findOne({_id:id})
    if(!video){
        return res.status(404).render("404",{pageTitle: "video not found"})
    }   
    return res.render("edit",{pageTitle: `Edit ${video.title}`, video: video})
}
export const postEdit = async(req,res) => {
    const {id} = req.params;
    const video = await Video.exists({_id:id});
    if(!video){
        return res.status(404).render("404",{pageTitle: "video not found"})
    }
    const {title, description, hashtags} = req.body;
    
    // video.title=title;
    // video.description=description;
    // video.hashtags=hashtags
    //     .split(",")
    //     .map((word) => word.startsWith("#") ? word : `#${word}`);
    // await video.save(); 
    // -----same as after line-------

    console.log(hahstags);
    await Video.findByIdAndUpdate(id,{
        title: title,
        description: description,
        hashtags: Video.formatHashtags(hashtags),
    });

    res.redirect(`/videos/${id}`);
}
export const getUpload = (req,res) => {
    res.render("upload", {pageTitle: "Upload Video"});
}
export const postUpload = async(req,res) => {
    const {title, description, hashtags} = req.body;
    const video = new Video({
        title: title,
        description: description,
        hashtags: Video.formatHashtags(hashtags),
    });
    try {
        await video.save();
    } catch(error) {
        res.status(400).render("upload", {
            pageTitle: "Upload Video",
            errorMessage: error._message});
        }
    return res.redirect("/");
}

export const deleteVideo = async (req,res) => {
    const {id} = req.params;
    await Video.findByIdAndDelete(id)  //mongoose method
    return res.redirect("/");
}

export const search = async (req, res) => {
    const {keyword} = req.query; //get a GET method value
    let videos=[];
    if(keyword){
        //search
        videos = await Video.find({
            title: {
                $regex: new RegExp(keyword, "i") //search with regular expression
                                                 //auto include with
            },
        })
    }
    return res.render("search",{pageTitle: "search", videos:videos});
}