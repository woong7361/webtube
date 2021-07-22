import User from "../models/user";
import Video from "../models/video";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

export const getJoin = (req,res)=>{
    res.render("join", {pageTitle: "join"});
}
export const postJoin= async (req,res) => {
    const {name, username, email, password, password2, location} = req.body;
    if(password !== password2){
        return res.status(400).render("join",{ //status 400 means badrequest
            pageTitle: "join",
            errorMessage: "password does not match",
        })
    }
    const exist = await User.exists({$or: [{username: username}, {email: email}]});
    if(exist){
        return res.status(400).render("join",{
            pageTitle: "join",
            errorMessage: "this username/email is already taken",
        })
    }
    try{ 
        await User.create({
            name: name,
            username: username,
            email: email,
            password: password,
            location: location,
        })
        return res.redirect("/login");
    }catch(error){
        return res.status(400).render("join",{
            pageTitle: "join",
            errorMessage: error,_message,
        })
    }
}
export const getLogin = (req,res) => {
    res.render("login",{pageTitle: "Login"});
}
export const postLogin= async(req,res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username:username, socialOnly: false});
    if(!user){
        return res.status(400).render("login",{
            pageTitle:"Login",
            errorMessage: "An account with this username does not exists.",
        })
    }
    const ok = await bcrypt.compare(password,user.password);
    if(!ok){
        return res.status(400).render("login",{
            pageTitle: "Login",
            errorMessage: "wroong password", 
        })
    }
    req.session.loggedIn=true //add a property to req.session object
    req.session.user=user;//user means database user
    return res.redirect("/");
}
export const startGithubLogin = (req,res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        scope: "user:email read:user",
        allow_signup: false,
    }
    const params = new URLSearchParams(config).toString(); //get a GET method url parameter
    const githubLoginUrl= baseUrl+'?'+params;
    return res.redirect(githubLoginUrl);
}
export const finsithGithubLogin = async(req,res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = baseUrl+'?'+params;
    const data = await fetch(finalUrl,{
        method: "POST",
        headers: {
            Accept: "application/json"
        },
    })
    const json = await data.json();
    if("access_token" in json){
        const {access_token} = json;
        const apiUrl = "https://api.github.com"
        const userData = await (
            await fetch(apiUrl+"/user",{
            headers: {
                Authorization: "token "+access_token,
            },
        })).json();
        const emailData = await (
            await fetch(apiUrl+"/user/emails",{
            headers: {
                Authorization: "token "+access_token,
            },
        })).json();
        const emailObj = emailData.find(
            (emailObj) => emailObj.primary === true && emailObj.verified === true
        );
        if(!emailObj){
            return res.redirect("/login");
        }
        let user = await User.findOne({email:emailObj.email});
        if(!user){
            const user = await User.create({
                avatarUrl: userData.avatar_url,
                name: userData.name,
                username:userData.login,
                email:emailObj.email,
                password: "",
                location: userData.location,
                socialOnly: true,
            })
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    }else{
        return res.redirect("/login");
    }
}
export const logout = (req,res) => {
    req.session.destroy();
    return res.redirect("/");
}


export const getEdit = (req,res)=>{
    res.render("edit-profile",{pageTitle: "Edit profile"});
}
export const postEdit = async (req,res)=>{
    const {session: {user: {_id, avatarUrl}}} = req; //id = req.session.user.id
    const {
        name,
        email,
        username,
        location
    } = req.body;
    const file = req.file;
    const updateUser = await User.findByIdAndUpdate(_id, {
        avatarUrl: file ? file.path : avatarUrl,
        name: name,
        username: username,
        email: email,
        location: location,
    }, {new: true});
    req.session.user = updateUser;
    res.redirect("/users/edit");
}
export const getChangePassword = (req,res)=> {
    return res.render("change-password",{pageTitle: "change password"});
}
export const postChangePassword = async (req,res)=> {
    const id = req.session.user._id;
    const password = req.session.user.password
    const {oldPassword, newPassword, newPassword2} = req.body;
    const ok = await bcrypt.compare(oldPassword,password);
    if(!ok){
        returnres.status(400).render("change-password",{
            pageTitle: "change password",
            errorMessage: "the current password is not match"
        });
    }
    if(newPassword !== newPassword2){
        return res.status(400).render("change-password",{
            pageTitle: "change password",
            errorMessage: "the new Password does not match"
        });
    }
    const user = await User.findById(id);
    user.password = newPassword;
    await user.save();
    req.session.user.password = user.password;
    return res.redirect("/users/logout");
}
export const see = async(req,res) => {
    const id = req.params.id;
    const user = await User.findById(id).populate("videos");
    if(!user){
        return res.status(404).render("404");
    }
    return res.render("profile", {
        pageTitle: user.name,
        user: user,
    });
}

export const remove =  (req,res)=>{
    res.send("delete user");
}

