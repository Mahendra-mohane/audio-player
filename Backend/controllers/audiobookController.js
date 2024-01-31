const Audiobook = require("../models/Audiobook");

const audiobookController = {
  getAudiobooks: async (req, res) => {
    try {
      const audiobooks = await Audiobook.find({});
      console.log("audiobook", audiobooks);
      res.status(200).json({ status: "success", audiobooks });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
  playNextSong: async (req, res) => {
    try {
      const { audiobookId } = req.params;
      const currentAudiobook = await Audiobook.findById(audiobookId);
      const nextAudiobook = await Audiobook.findOne({
        _id: { $gt: audiobookId },
      }).sort({ _id: 1 });

      if (!nextAudiobook) {
        return res.status(404).json({ message: "No next song found" });
      }

      res.json(nextAudiobook);
    } catch (error) {
      console.error("Error playing next song:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  playPreviousSong: async (req, res) => {
    try {
      const { audiobookId } = req.params;
      const currentAudiobook = await Audiobook.findById(audiobookId);
      const previousAudiobook = await Audiobook.findOne({
        _id: { $lt: audiobookId },
      }).sort({ _id: -1 });

      if (!previousAudiobook) {
        return res.status(404).json({ message: "No previous song found" });
      }

      res.json(previousAudiobook);
    } catch (error) {
      console.error("Error playing previous song:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  pauseSong: async (req, res) => {
    try {
      // Your logic for pausing the song
      res.json({ message: "Song paused successfully" });
    } catch (error) {
      console.error("Error pausing the song:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  uploadSong: async (req, res) => {
    try {
      // Your logic for uploading a new song
      res.json({ message: "Song uploaded successfully" });
    } catch (error) {
      console.error("Error uploading the song:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = audiobookController;
