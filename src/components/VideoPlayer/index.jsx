import clsx from "clsx";
import { use, useContext, useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.css";
import VideoPlayerActions from "./VideoPlayerActions.jsx";

//import useNearScreen from '../../hooks/nearUse'
import VideoDescription from "../VideoDescription/index.jsx";
//import videosrc from '/vid.mp4'
import React from "react";
import ReactPlayer from "react-player/lazy";
import nearUse from "@/hooks/nearUse";
import audioCtx from "@/context/audioCtx";
import { Waypoint } from "react-waypoint";

export default function VideoPlayer(
  { playUrl, author, tags, title, images },
  id
) {
  const [hasWindow, setHasWindow] = useState(false);
  const vidRef = useRef(null);


  const { muting, setMuting } = useContext(audioCtx);

  const [play, setPlaying] = useState(false);

  const handleMuted = () => {
    const { current: videoEl } = vidRef;
    muting ? (videoEl.muted = false) : (videoEl.muted = true);
    setMuting(!muting);
  };
  const handlePlay = () => {
    const { current: videoEl } = vidRef;
    play ? (videoEl.playing = true) : (videoEl.playing = false);
    setPlaying(!play);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  return (
    <Waypoint onEnter={()=>setPlaying(true)} onLeave={() => setPlaying(false)}>
      <div className={styles.wrapper}>
        {hasWindow ? (
          <ReactPlayer
            className="react-player" 
            url={playUrl}
            width="100%"
            height="100%"
            playing={play}
            loop
            ref={vidRef}
            muted={muting}
          />
        ) : (
          "not found"
        )}

        <i
          className={playing ? styles.hidden : styles.player}
          onClick={()=>setPlaying(!play)}
        />
        <i
          className={muting ? styles.audioMuted : styles.audio}
          onClick={handleMuted}
        />
        <VideoPlayerActions />
        <VideoDescription
          albumCover={images.thumbnail}
          username={author}
          description={tags}
          songTitle={title}
        />
      </div>
    </Waypoint>
  );
}
