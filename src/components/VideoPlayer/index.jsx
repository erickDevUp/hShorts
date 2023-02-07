import clsx from "clsx";
import { use, useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.css";
import VideoPlayerActions from "./VideoPlayerActions.jsx";

//import useNearScreen from '../../hooks/nearUse'
import VideoDescription from "../VideoDescription/index.jsx";
//import videosrc from '/vid.mp4'
import React from "react";

const desc =
  "NextJS is a React-based framework.  beautiful Web applications for different platforms like Windows, Linux, and mac. Approach: To add our …";
const propsDesc = {
  albumCover: "post malone - Happy",
  username: "hyyuu",
  description: desc,
  songTitle: "post malone - Happy",
};

export default function VideoPlayer({ playUrl ,author,tags , title , images}) {
  const vidRef = useRef(null);
  const [playVideo, setPlayVideo] = useState(false);

  const handlePlay = () => {

    console.log(vidRef)
  };
  return (
    <div className={styles.wrapper}>
      <video
        className={styles.video}
        id="my-player"
        muted
        loop
        data-setup="{}"
        ref={vidRef}
        autoPlay
        

      >
        <source
          type="application/x-mpegURL"
          src={playUrl}
        />
      </video>

      <i
        className={playVideo ? styles.player : styles.hidden}
        onClick={handlePlay}
      />
      <VideoPlayerActions />
      <VideoDescription albumCover={images.thumbnail} username={author} description={tags} songTitle={title} />
    </div>
    
  );
}
