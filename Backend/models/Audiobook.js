const mongoose = require("mongoose");

const audiobookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
  },

  narrator: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  audioSrc: {
    type: String,
  },
});

const Audiobook = mongoose.model("Audiobook", audiobookSchema);

module.exports = Audiobook;
