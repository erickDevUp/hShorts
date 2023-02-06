import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
const {Client}  = require("@hiveio/dhive");

const client = new Client([
  "https://api.hive.blog",
  "https://api.hivekings.com",
  "https://anyx.io",
  "https://api.openhive.network",
]);
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  async function main(author,permlink) {
    const query = {
      tag: "threeshorts", // This tag is used to filter the results by a specific post tag
      select_authors:author,
      select_permlink:permlink,
    };
  

    client.database.getDiscussions("trending", query).then(async (result) => {
      result.forEach((post) => {
        const json = JSON.parse(post.json_metadata);
        const image = json.image ? json.image[0] : "";
        const title = post.title;
        const author = post.author;
        const created = new Date(post.created).toDateString();

        console.log(post);
      });      
    });
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link href="//vjs.zencdn.net/6.7/video-js.min.css" rel="stylesheet"></link>
      </Head>
      <main className={styles.main}>j</main>
    </>
  );
}
