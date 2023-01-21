import FeedVideos from "@/components/FeedVideos";
import VideoPlayer from "@/components/VideoPlayer";

import styles from './styles.module.css'

export default function Home() {
  return (
    <div className={styles.App}>
      <main className={styles.main}>
        <FeedVideos />
      </main>
    </div>
  );
}
