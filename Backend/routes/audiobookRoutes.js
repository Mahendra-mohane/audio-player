const express = require("express");
const audiobookController = require("../controllers/audiobookController");

const router = express.Router();
router.get("/getAudiobooks", audiobookController.getAudiobooks);
router.get("/:audiobookId/next", audiobookController.playNextSong);
router.get("/:audiobookId/previous", audiobookController.playPreviousSong);
router.put("/:audiobookId/pause", audiobookController.pauseSong);
router.post("/upload", audiobookController.uploadSong);

module.exports = router;
