import { AudioCtx } from "@/context/audioCtx.jsx";
import { useState, useEffect } from "react";
import VideoPlayer from "../VideoPlayer/index.jsx";
import styles from "./styles.module.css";
//import { getVideos } from '../../services/index.js'

export default function FeedVideos() {
  const [videos, setVideos] = useState([]);
  /*const [error, setError] = useState(null)

  useEffect(() => {
    getVideos().then(([error, videos]) => {      
      if (error) return setError(error)
      setVideos(videos)
    })
  }, [])

  if (error) {
    return (
      <span>{error}</span>
    )
  }
  */
  useEffect(() => {
    fetch("https://3speak.tv/apiv2/feeds/@threeshorts-mod")
      .then((response) => response.json())
      .then((data) => setVideos(data));
  }, []);

  return (
    <AudioCtx>
      {videos.map((video, i) => {
        if (i < 3) {
          return (
            <div key={video.permlink} className={styles.item}>
              <VideoPlayer {...video} />
            </div>
          );
        }
      })}
    </AudioCtx>
  );
}
