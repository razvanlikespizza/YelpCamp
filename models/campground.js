var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String,
    price: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId
        },
        username: String
    }
},{usePushEach: true });

module.exports = mongoose.model("Campground", campgroundSchema);