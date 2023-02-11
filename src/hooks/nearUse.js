
import audioCtx from "@/context/audioCtx";
import { useState, useEffect, useContext } from "react";

let observer;
const isClient = typeof window !== "undefined";

const hasIntersectionObserverSupport = () =>
  typeof window.IntersectionObserver !== "undefined";

// import intersection observer polyfill only if on client
// and if not supported by browser
const getIntersectionObserver = () => {
  return Promise.resolve(
    isClient &&
      !hasIntersectionObserverSupport() &&
      import("intersection-observer")
  );
};

// options for intersection observer in order to improve the effect
const intersectionObserverOptions = {
  root: null, // windows viewport will be used
  rootMargin: "0px",
  threshold: 0.9,
};

const handleIntersect = (entries, observer) => {
  entries.forEach((entry) => {
    const { target, isIntersecting } = entry;
    target._onIntersect(observer, isIntersecting);
  });
};

// get observer from the cache or create a new one
const getObserver = () =>
  getIntersectionObserver().then((_) => {
    if (observer) return observer;
    if (isClient) {
      return new window.IntersectionObserver(
        handleIntersect,
        intersectionObserverOptions
      );
    }
  });


export default (video,id) => {

  const [playing, setPlaying] = useState(false);
  const { muting, setMuting } = useContext(audioCtx);

  useEffect(
    function () {
      const { current } = video;
      if (!current) return;
      // get observer async and only when needed
      getObserver().then((observer) => observer.observe(current));

      // mutate the current target to add a method to be executed when intersecting
      current._onIntersect = (observer, isIntersecting) => {

        if (isIntersecting) {
          console.log(current);
          setPlaying(true);

          //mutin in the start
          if (id == 0) {
            setMuting(true);
          } else setMuting(false);
        } else {
          
          setPlaying(false);
          
          setMuting(true);
        }
      };
    },
    [video]
  );




  const handleMuted = () => {
    const { current: videoEl } = video;
    muting ? (videoEl.muted = false) : ( videoEl.muted = true);

    setMuting(!muting);
  };
  const handlePlay = () => {
    const { current: videoEl } = video;
    playing ? videoEl.playing =true : videoEl.playing=false;

    setPlaying(!playing);
  };


  return {
    handleMuted,playing,handlePlay
  };
}
