const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProjectSchema =new Schema({
    name: {
        type: String
    },
    descriptio:{
        type: String
    },
    topic: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})
module.exports = mongoose.model("Project", )