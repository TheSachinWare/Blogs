const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

const { v4 : uuidv4 } = require("uuid");//To give diffrent id we  have required that UUID package.
const methodOverride  = require("method-override");//To override we have required method-override pacakge.

app.use(express.urlencoded( { extended : true } ));
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views",  path.join(__dirname, "views"));

let posts = [
    {
        id : uuidv4(),
        username : "Sachin Ware.",
        content : "I love coding."
    },
    {
        id : uuidv4(),
        username : "Sandeep Maheshwari.",
        content : "Hardwork is important to acheive success. Karna hai toh karna hai."
    },
    {
        id : uuidv4(),
        username : "Krishna  Vridavanvasi.",
        content : "I am currently working in Google."
    }
]

app.get("/", (req, res) =>{
    res.send("Server working well.");
});

app.get("/posts", (req, res) =>{
    res.render("index.ejs", { posts});
});

app.get("/posts/new", (req, res) =>{
    res.render("new.ejs");//In 'GET' request, information is inside the query.
});

app.post("/posts/", (req, res) =>{
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });

    console.log(req.body);//In 'POST' request, information is inside the body.
    // res.send("Post request working.");

    res.redirect("/posts");
});

//Show Route.
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);

    console.log(`${id} : ${post}`);

    // res.send("Request Working.");
    res.render("show.ejs", {post} );
});

//Update Route.
app.patch("/posts/:id", (req, res) =>{
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);

    post.content = newContent;

    console.log(post);

    // res.send("Patch request working.");
    res.redirect("/posts");
});

//Edit Route.
app.get("/posts/:id/edit", (req, res) =>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);

    res.render("edit.ejs", { post });
});

//Delete Route.
app.delete("/posts/:id", (req, res) =>{
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);

    // res.send("Deleted Successfully.");
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log(`Listening to port ${port}.`);
});