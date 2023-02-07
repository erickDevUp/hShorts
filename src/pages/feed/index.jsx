import FeedVideos from "@/components/FeedVideos";
import VideoPlayer from "@/components/VideoPlayer";
import Head from "next/head";
import Script from "next/script";

import styles from "./styles.module.css";

export default function Home() {
  return (
    <div className={styles.App}>
      <Head>
        <title>hShort</title>
        <meta name="description" content="short video for hive" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>
      <main className={styles.main}>
        <FeedVideos />
      </main>


      <Script
        src="https://unpkg.com/video.js@7.10.2/dist/video.min.js"
        strategy="afterInteractive"
      ></Script>

      <Script
        src="https://cdn.jsdelivr.net/npm/hls.js@latest"
        strategy="afterInteractive"
      ></Script>
    </div>
  );
}
