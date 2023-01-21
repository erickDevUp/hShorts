import clsx from 'clsx'
import { use, useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.css'
import VideoPlayerActions from './VideoPlayerActions.jsx'

//import useNearScreen from '../../hooks/nearUse'
import VideoDescription from '../VideoDescription/index.jsx'
//import videosrc from '/vid.mp4'
import React from 'react'

const desc = "NextJS is a React-based framework.  beautiful Web applications for different platforms like Windows, Linux, and mac. Approach: To add our …"
const propsDesc = {albumCover:"post malone - Happy", username:"hyyuu", description:desc, songTitle:"post malone - Happy" }

  


export default function VideoPlayer ({src}) {



  

  const vidRef = useRef(null);
  const [playVideo,setPlayVideo]= useState(false);




  const handlePlay = () => {
    
    if (vidRef.current.paused) {
      vidRef.current.play();
      
    }else vidRef.current.pause();
    setPlayVideo(!playVideo)
  }


  

  

  return (
    <div className={styles.wrapper}>
      <video
        className={styles.video}
        controls={false}
        loop
        ref={vidRef}
        autoPlay={true}
        muted={true}
        onClick={handlePlay}
        >
          <source src={src} />
        </video>
        
      <i className={playVideo?styles.player:styles.hidden} onClick={handlePlay} />
      <VideoPlayerActions />
      <VideoDescription {...propsDesc}/>

      </div>

  )
}
