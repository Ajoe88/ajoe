import Head from 'next/head'
import MHeader from './header'
import Nav from './nav'
import BackgroundImage from './bg'
import BackToHome from './back'

import styles from '../styles/layout.module.css'

type LayoutProps = {
  home?: boolean
  children?: any
}

const siteConfiguration = {
  name: 'Ajoe',
  title: 'Ajoe个人站点, 博客',
  description: '我是阿joe, 祝好',
}
const { name, title, description } = siteConfiguration

export default function Layout({ children, home }: LayoutProps) {
  return (
    <div>
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content={description} />
          <meta
            property="og:image"
            content={`https://og-image.now.sh/${encodeURI(
              title
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={title} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <MHeader home={home} name={name} />
        <Nav />
        <main>{children}</main>
        <BackToHome home={home} />
      </div>
      <BackgroundImage />
    </div>
  )
}
