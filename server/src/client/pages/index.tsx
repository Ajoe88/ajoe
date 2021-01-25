import React from 'react'
import { NextPage } from 'next'

type HomePageProps = {
  articles: Array<String>
}

const Home: NextPage<HomePageProps> = ({ articles }) => {
  return <p>Name: {JSON.stringify(articles)}</p>
}

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/articles')
  const articles = await res.json()
  return { props: { articles } }
}

export default Home
