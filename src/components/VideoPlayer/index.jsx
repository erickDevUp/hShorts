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
import { useInView } from "react-intersection-observer";

export default function VideoPlayer(
  { playUrl, author, tags, title, images },
  id
) {
  const [hasWindow, setHasWindow] = useState(false);
  const vidRef = useRef(null);

  const { ref: divRef, inView: isView, entry } = useInView();

  const { muting, setMuting } = useContext(audioCtx);

  const [playing, setPlaying] = useState(false);

  const handleMuted = () => {
    const { current: videoEl } = vidRef;
    muting ? (videoEl.muted = false) : (videoEl.muted = true);

    setMuting(!muting);
  };
  const handlePlay = () => {
    const { current: videoEl } = vidRef;
    playing ? (videoEl.playing = true) : (videoEl.playing = false);

    setPlaying(!playing);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);
  useEffect(() => {
    console.log("seve");
  }, [isView]);
  return (
    <div ref={divRef} className={styles.wrapper}>
      {hasWindow ? (
        <ReactPlayer
          className="react-player"
          url={playUrl}
          width="100%"
          height="100%"
          playing={playing}
          loop
          ref={vidRef}
          muted={muting}
          onClick={handlePlay}
          onPlay={() => setPlaying(true) }
          onPause={() => setPlaying(false) }
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
