const mongoose = require("mongoose"); // to use mongoDB quries and interact with database we require mongoose package;


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/chatbox") // to build a connection between node and mongoDB;
}
main()
    .then(() => console.log("..."))
    .catch(err => console.log(err));


const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
         required: true
    },
    msg: {
        type: String,
        maxLength: 100
    },
    created_at: {
        type: Date,
        required: true
    }
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;