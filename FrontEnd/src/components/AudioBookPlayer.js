// App.js

import React, { useState, useRef, useEffect } from "react";
import "../App.css";

const AudioBookPlayer = ({ audiobooks }) => {
  console.log("first", audiobooks);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audioElement, setAudioElement] = useState(
    new Audio(audiobooks[currentTrackIndex]?.audioSrc)
  );

  useEffect(() => {
    // Update audioElement when currentTrackIndex changes
    setAudioElement(new Audio(audiobooks[currentTrackIndex]?.audioSrc));
    audioElement.pause();

    if (isPlaying) {
      audioElement.play();
    }

    if (audioElement) {
      const updateTime = () => {
        setCurrentTime(audioElement?.currentTime);
      };

      const updateDuration = () => {
        setDuration(audioElement?.duration);
      };

      audioElement.addEventListener("timeupdate", updateTime);
      audioElement.addEventListener("loadedmetadata", updateDuration);

      // Cleanup event listeners
      return () => {
        audioElement.removeEventListener("timeupdate", updateTime);
        audioElement.removeEventListener("loadedmetadata", updateDuration);
      };
    }
  }, [currentTrackIndex]);

  const playPauseToggle = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const goToPreviousTrack = () => {
    const newIndex = Math.max(0, currentTrackIndex - 1);
    // Reset playback state and change track
    setPlaybackState(false, 0);
    setCurrentTrackIndex(newIndex);
  };

  const goToNextTrack = () => {
    const newIndex = Math.min(audiobooks.length - 1, currentTrackIndex + 1);
    // Reset playback state and change track
    setPlaybackState(false, 0);
    setCurrentTrackIndex(newIndex);
  };

  const setPlaybackState = (playing, time) => {
    setIsPlaying(playing);
    setCurrentTime(time);
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = time;
    }
  };

  return (
    <div className="audiobook-player">
      {/* <audio controls>
        <source
          src="http://localhost:8000/api/v1/static/song/LaalPeeli.mp3"
          type="audio/mp3"
        />
        Your browser does not support the audio element.
      </audio> */}

      <img
        src={audiobooks[currentTrackIndex]?.coverImage}
        alt={audiobooks[currentTrackIndex]?.title}
        className="cover-image"
      />
      <h2>{audiobooks[currentTrackIndex]?.title}</h2>
      <p>{audiobooks[currentTrackIndex]?.author}</p>
      <div className="controls">
        <div onClick={goToPreviousTrack}>
          <img
            className="playPauseIcon"
            src={require("../image/Vectorprevious.png")}
            alt=""
          />
        </div>
        <div onClick={playPauseToggle}>
          {isPlaying ? (
            <img
              className="playPauseIcon"
              src={require("../image/pause-play.png")}
              alt=""
            />
          ) : (
            <img
              className="playPauseIcon"
              src={require("../image/play.png")}
              alt=""
            />
          )}
        </div>
        <div onClick={goToNextTrack}>
          <img
            className="playPauseIcon"
            src={require("../image/Vectornext.png")}
            alt=""
          />
        </div>
      </div>
      <div className="timeline">
        <p>{formatTime(currentTime)}</p>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={(e) => setPlaybackState(isPlaying, e.target.value)}
        />
        <p>{formatTime(duration)}</p>
      </div>
    </div>
  );
};

export default AudioBookPlayer;
