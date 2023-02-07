import clsx from "clsx";
import { use, useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.css";
import VideoPlayerActions from "./VideoPlayerActions.jsx";

//import useNearScreen from '../../hooks/nearUse'
import VideoDescription from "../VideoDescription/index.jsx";
//import videosrc from '/vid.mp4'
import React from "react";

import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function VideoPlayer({ playUrl, author, tags, title, images }) {
  const vidRef = useRef(null);
  const [playVideo, setPlayVideo] = useState(false);

  const handlePlay = () => {
    console.log(vidRef);
  };

  return (
    <div className={styles.wrapper}>
      <ReactPlayer
        className="react-player"
        url="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
        width="100%"
        height="100%"
        ref={vidRef}
        autoPlay
      />

      <i
        className={playVideo ? styles.player : styles.hidden}
        onClick={handlePlay}
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
