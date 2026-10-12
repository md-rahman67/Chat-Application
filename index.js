const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const path = require("path"); // to access views and public folder from index.js we requre path;
const mongoose = require("mongoose"); // to use mongoDB quries and interact with database we require mongoose package;
const ExpressError = require("./ExpressError.js"); //! Custom Error Class

const methodOverride = require("method-override"); // require method-override package to use https verbs like PUT, DELETE & PATCH;


const Chat = require("./models/chat.js"); // require ChatSchema for chats collection, rules for documents to follow;


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/chatbox") // to build a connection between node and mongoDB;
}
main()
    .then(() => console.log("Connection SuccessFUL MONGODB"))
    .catch(err => console.log(err));


// ---------------SERVER WORKS---------------------------------

const app = express(); // call express function that returns methods and properties;
const port = 8080; // local server;

app.use(methodOverride('_method'));


app.set("view engine", "ejs"); // to render our ejs file set view  engine to ejs;

app.set("views", path.join(__dirname, "views")); // setpath for views folder so it can run from anywhere;
app.use(express.static(path.join(__dirname, "public"))); // setpath for public folder so it can run from anywhere;

app.use(express.urlencoded({extended: true})); // to parse and read  POST req data;


// GET REQ --> main route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("chats.ejs", { chats });
})

// GET REQ --> new form route
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
})


// POST REQ --> to add new chat route
app.post("/chats", async(req, res) => {
    let { sender, msg, reciver} = req.body;

    const chat = new Chat({
        from: sender,
        to: reciver,
        msg: msg,
        created_at: new Date()
    })

    await chat.save()
        .then(data => console.log(data))
        .catch(err => console.log(err));

    res.redirect("/chats");
})

// GET REQ --> to edit form route
app.get("/chats/:id/edit", async (req, res) => {
    let id = req.params;
    let chatId = id.id;
    const chat = await Chat.findById(chatId);
    res.render("edit.ejs", { chat });
})

// PUT REQ --> to update route
app.put("/chats/:id", async(req, res) => {
    let id = req.params;
    let msg = req.body;
    let chatId = id.id;
    let editMsg = msg.msg;

    await Chat.findByIdAndUpdate(
        chatId,
        {$set: {msg: editMsg}}
    );

    res.redirect("/chats");
})

// DELETE REQ --> delete chat route
app.delete("/chats/:id", async(req, res) => {
    let id = req.params;
    let chatId = id.id;

    const deleted = await Chat.findByIdAndDelete(chatId);
    console.log(deleted);

    res.redirect("/chats");
})

app.get("/", (req, res) => {
    res.render("home.ejs");
})

app.listen(port, () => {
    console.log(`app is listening to this port: ${port}`);
})