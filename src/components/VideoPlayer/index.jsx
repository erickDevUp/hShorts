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

export default function VideoPlayer({ playUrl, author, tags, title, images},id) {
  const vidRef = useRef(null);
  const [hasWindow, setHasWindow] = useState(false);
  




  const { muting } = useContext(audioCtx);
  const { handleMuted,playing,setPlaying } = nearUse(vidRef,id);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  const handlePlay = () => {
    const { current: videoEl } = vidRef;
    playing ? videoEl.playing =true : videoEl.playing=false;

    setPlaying(!playing);
  };

  return (
    <div className={styles.wrapper}>
      {hasWindow ? (
        <ReactPlayer
          className="react-player"
          url={playUrl}
          width="100%"
          height="100%"
          ref={vidRef}
          playing={playing}
          loop
          muted={muting}
          onClick={handlePlay}
          
        />
      ) : (
        "not found"
      )}

      <i
       className={playing ? styles.hidden : styles.player}
       onClick={handlePlay}
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
  );
}
