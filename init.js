const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/chatbox") // to build a connection between node and mongoDB;
}
main()
    .then(() => console.log("Connection SuccessFUL MONGODB"))
    .catch(err => console.log(err));


Chat.insertMany([
    {
        from: "sahiba",
        to: "rahfat",
        msg: "are you coming for the party tonight...",
        created_at: new Date()
    },
     {
        from: "bebo",
        to: "bob",
        msg: "saw you texts, and i don't think we're a good match for eachother, I am sorryyy.",
        created_at: new Date()
    },
     {
        from: "mehboob",
        to: "sahil",
        msg: "Did you finish the assignment?",
        created_at: new Date()
    },
    {
        from: "priyanka",
        to: "ankita",
        msg: "Do you really in love with him? or it's just a attraction?",
        created_at: new Date()
    }
])