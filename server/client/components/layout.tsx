import Head from 'next/head'
import React from 'react'
import Header from './header'
import BackgroundImage from './bg'
import BackToHome from './back'
import Footer from './footer'
import useScrollPosition from '../hooks/useScrollPosition'

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
  const scrollPos = useScrollPosition()
  console.log(scrollPos, 'scrollPos')
  return (
    <div
      className={
        'container-wrapper w-full h-full text-gray-500 ' +
        (scrollPos > 240 ? 'a-scroll' : '')
      }
    >
      <div className="w-full z-10 absolute inset-x-0">
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
        <Header name={name} />
        <main className="mx-auto pt-0 p-2 sm:p-10 max-w-5xl">{children}</main>
        <BackToHome home={home} />
        <Footer />
      </div>
      <BackgroundImage />
    </div>
  )
}
