import Link from 'next/link'
import styles from '../styles/layout.module.css'

const BackToHome = ({ home }: { home?: boolean }) => {
  return !home ? (
    <div className={styles.backToHome}>
      <Link href="/">
        <a>← Back to home</a>
      </Link>
    </div>
  ) : null
}

export default BackToHome
