const mongoose = require("mongoose");

const newPost = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    default: Date.now()
  }
});

let Post = (module.exports = mongoose.model("Post", newPost));
