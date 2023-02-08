
import audioCtx from '@/context/audioCtx'
import {useState, useEffect, useContext} from 'react'


let observer
const isClient = typeof window !== 'undefined'

const hasIntersectionObserverSupport = () =>
typeof window.IntersectionObserver !== 'undefined'

// import intersection observer polyfill only if on client
// and if not supported by browser
const getIntersectionObserver = () => {
  return Promise.resolve(
    isClient &&
      !hasIntersectionObserverSupport() &&
      import('intersection-observer')
  )
}

// options for intersection observer in order to improve the effect
const intersectionObserverOptions = {
  root: null, // windows viewport will be used
  rootMargin: '100px 0px 0px 0px'
}

const handleIntersect = (entries, observer) => {
  entries
    .filter(entry => entry.isIntersecting)
    .forEach(entry => {
      const {target} = entry
      target._onIntersect(observer)
    })
}

// get observer from the cache or create a new one
const getObserver = () =>
  getIntersectionObserver().then(_ => {
    if (observer) return observer
    if (isClient) {
      return new window.IntersectionObserver(
        handleIntersect,
        intersectionObserverOptions
      )
    }
  })

export default ({video}) => {

  //  const [playing, setPlaying] = useState(false);

  const { muting, setMuting } = useContext(audioCtx);

  useEffect(
    function () {
      const { current } = video;
      if (!current) return;
      // get observer async and only when needed
      getObserver().then((observer) => observer.observe(current));

      // mutate the current target to add a method to be executed when intersecting
      current._onIntersect = (observer, isIntersecting) => {
  //      const { current: videoEl } = video;

        if (isIntersecting) {
          //videoEl.play();
          //setPlaying(true);

          //mutin in the start
          if (id == 0) {
            setMuting(true);
          } else setMuting(false);
        } else {
          //  videoEl.pause();
          // setPlaying(false);
          
          setMuting(true);
        }
      };

      // clean observed element when unmounted
      return () => (current._isSubscribed = false);
    },
    [video]
  );

  const handlePlay = () => {
    const { current: videoEl } = video;
    playing ? videoEl.pause() : videoEl.play();

    setPlaying(!playing);
  };


  const handleMuted = () => {
    const { current: videoEl } = video;
    muting ? (videoEl.contentWindow.speaker[0].muted = false) : ( videoEl.contentWindow.speaker[0].muted = true);

    setMuting(!muting);
  };

  return {
    handleMuted,
  };
}
