const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4 : uuidv4 } = require("uuid");
const methodOverride = require("method-override");


app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));

app.use(express.urlencoded({extended : true}));

let posts = [
    {
        id : uuidv4(),
        username : "meowcatz",
        image : "https://plus.unsplash.com/premium_photo-1677545182067-26ac518ef64f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        caption : "Hello my name is Fluffy"
    },
    {
        id : uuidv4(),
        username : "doggy",
        image : "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9nc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        caption : "Hello my name is alex"
    },
    {
        id : uuidv4(),
        username : "catynip",
        image :  "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        caption : "Hello my name is billo"
    },
    {
        id : uuidv4(),
        username : "baghira",
        image :   "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRvZ3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
        caption : "Hello my name is baghira"
    },
    {
        id : uuidv4(),
        username : "meowcatz",
        image : "https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2F0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        caption : "Hello my name is billy"
    }
]

// GET request for posts page
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

// Create a new post
// i) render a form to take input of post
// ii) add info to posts array

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,caption} = req.body;
    let id = uuidv4();
    let image = "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRvZ3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60";
    // let newPost = {id,username,image,caption};
    posts.push({id,username,image,caption});
    res.redirect("/posts");
})


// See details
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("show.ejs",{post});
})



// Patch request for updating
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newCaption = req.body.caption;
    let post = posts.find((p) => p.id === id);
    post.caption = newCaption;
    res.redirect("/posts")
})

// Edit request
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs",{post});
})

// Delete Post
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})




app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})