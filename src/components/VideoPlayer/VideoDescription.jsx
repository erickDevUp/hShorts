import AlbumDisk from '../VideoDescription/AlbumDisk'
import styles from './styles.module.css'

const desc = "NextJS is a React-based framework. It has the power to Develop beautiful Web applications for different platforms like Windows, Linux, and mac. Approach: To add our …"

export default function VideoDescription ({ albumCover="post malone - Happy", username="hyyuu", description=desc }) {
  return (
    <footer className={styles.description}>
      <div>
        <strong>
          <a href={`/user/${username}`}>
            @{username}
          </a>
        </strong>
        <p>
          {description}
        </p>
      </div>

      <div>
        <AlbumDisk albumCover={albumCover} />
      </div>

    </footer>
  )
}
