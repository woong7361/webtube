import User from "../models/user";
import Video from "../models/video"
import Comment from "../models/Comment"


export const home = async(req,res) =>{
    // Video.find({},(error,videos) => {
    //     return res.render("home",{pageTitle: "Home", videos: videos});
    // })
    const videos = await Video.find({}).sort({createdAt: "asc"});
    return res.render("home",{pageTitle: "Home", videos: videos});
}
export const watch = async(req,res) =>{
    const {id} = req.params;
    const video = await Video.findById(id).populate("owner").populate("comments");
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
    if(String(video.owner) !== String(req.session.user._id)){
        return res.status(403).redirect("/");
    }   
    return res.render("edit",{pageTitle: `Edit ${video.title}`, video: video})
}
export const postEdit = async(req,res) => {
    const {id} = req.params;
    const video = await Video.exists({_id:id});
    if(!video){
        return res.status(404).render("404",{pageTitle: "video not found"})
    }
    if(String(video.owner) !== String(req.session.user._id)){
        return res.status(403).redirect("/");
    }   
    const {title, description, hashtags} = req.body;
    
    // video.title=title;
    // video.description=description;
    // video.hashtags=hashtags
    //     .split(",")
    //     .map((word) => word.startsWith("#") ? word : `#${word}`);
    // await video.save(); 
    // -----same as after line-------
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
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log(req.session.user);
    const id = req.session.user._id;
    const file = req.file;
    const {title, description, hashtags} = req.body;
    const video = new Video({
        title: title,
        description: description,
        fileUrl: file.path,
        owner: id,
        hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(id);
    user.videos.push(video._id)
    user.save()
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

export const registerView = async(req,res) => {
    const {id} = req.params;
    const video = await Video.findById(id);
    if(!video) {
        return res.sendStatus(404); //not return rendering
    }
    video.meta.views = video.meta.views + 1;
    await video.save();
    return res.sendStatus(200);
}

export const createCommnet = async(req,res) => {
    const {
        session: {user},
        body: {text},
        params: {id},
    } = req;

    const video = await Video.findById(id)
    if(!video){
        return res.sendStatus(404);
    }
    const comment = await Comment.create({
        text:text,
        owner: user._id,
        video: id,
    })
    video.comments.push(comment._id);
    video.save();
    return res.status(201).json({newCommentId: comment._id});
}

export const deleteComment = async(req, res) => {
    const commentId  = req.params.id;
    const user = req.session.user
    const comment = await Comment.findById(commentId).populate("owner");
    console.log(comment.owner._id);
    if(comment.owner._id != user._id){
        console.log(comment.owner._id)
        console.log(user._id)

        return res.sendStatus(400);

    }
    await Comment.findByIdAndDelete(commentId);
    return res.sendStatus(200);
}




