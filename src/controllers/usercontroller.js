
export const join = (req,res)=>{
    res.send("join!");
}

export const edit = (req,res)=>{
    res.send("edit User");
}

export const remove =  (req,res)=>{
    res.send("delete user");
}

export const login = (req,res) => {
    res.send("Log In");
}

export const logout = (req,res) => {
    res.send("log Out");
}

export const see = (req,res) => {
    res.send("See User");
}
