import Video from "../models/video"

export const home = async(req,res) =>{
    // Video.find({},(error,videos) => {
    //     return res.render("home",{pageTitle: "Home", videos: videos});
    // })
    const videos = await Video.find({});
    return res.render("home",{pageTitle: "Home", videos: videos});
}
export const watch = (req,res) =>{
    const {id} = req.params;
    return res.render("watch",{pageTitle: `Watch `});
}
export const getEdit = (req,res)=>{
    const {id} = req.params;
    res.render("edit",{pageTitle: `Editing`})
}
export const postEdit =(req,res) => {
    const {id} = req.params;
    const title = req.body.title;
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
        hashtags: hashtags.split(",").map(word=>`#${word}`),
        // createdAt: Date.now(),
        meta: {
            view: 0,
            ratings: 0
        }
    });
    try {
        await video.save();
    } catch(error) {
        console.log("error: ", error._message);
        res.render("upload", {
            pageTitle: "Upload Video",
            errorMessage: error._message});
        }
    return res.redirect("/");
}



export const search = (req,res) => {
    res.send("Search Videos")
}
export const deleteVideo = (req,res) => {
    res.send("deleteVideo Videos");
}