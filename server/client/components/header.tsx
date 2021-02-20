import Link from 'next/link'

import styles from '../styles/layout.module.css'
import utilStyles from '../styles/utils.module.css'

type HeaderProps = {
  home?: boolean
  name: string
}
const MHeader = ({ home, name }: HeaderProps) => (
  <header className={styles.header}>
    {home ? (
      <>
        <img
          src="/images/profile.jpg"
          className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
          alt={name}
        />
        <h1 className={utilStyles.heading2Xl}>{name}</h1>
      </>
    ) : (
      <>
        <Link href="/">
          <a>
            <img
              src="/images/profile.jpg"
              className={`${styles.headerImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
          </a>
        </Link>
        <h2 className={utilStyles.headingLg}>
          <Link href="/">
            <a className={utilStyles.colorInherit}>{name}</a>
          </Link>
          <span className={utilStyles.pinkCircle}></span>
        </h2>
      </>
    )}
  </header>
)

export default MHeader
