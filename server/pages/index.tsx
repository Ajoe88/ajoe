import React from 'react'
import { NextPage, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Link from 'next/link.js'

import api from '../client/api'
import { Article } from '../src/article/Article'
import Layout from '../client/components/layout'
import Users from '../client/components/users'
import { UserContextProvider } from '../client/context/usersContext'
import { getSortedPostsData } from '../client/lib/posts'

type HomePageProps = {
  articles: Array<Article>
  mkdArticles: Array<any>
  ctx: {
    query: Record<string, never>
  }
}

const Home: NextPage<HomePageProps> = ({ articles, mkdArticles }) => {
  return (
    <Layout home>
      <Head>{}</Head>
      <UserContextProvider>
        <div>
          <h1>Article List</h1>
          <ul>
            {Array.isArray(articles) &&
              articles.map(({ id, createdAt, Title }) => (
                <li key={id}>
                  <Link href={`/blog/${id}`}>
                    <a className="inline-block right-0 align-baseline font-light text-sm text-500 hover:text-red-400">
                      {Title} - {createdAt}
                    </a>
                  </Link>
                </li>
              ))}

            {mkdArticles.map(({ id, date, title }) => (
              <li key={id}>
                <Link href={`/md/${id}`}>
                  <a className="inline-block right-0 align-baseline font-light text-sm text-500 hover:text-red-400">
                    {title} - {date}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <Users />
        </div>
      </UserContextProvider>
    </Layout>
  )
}

export const getServerSideProps = async ({
  query,
  req,
  res,
}: GetServerSidePropsContext) => {
  const articles = await api('articles', req, res)
  const mkdArticles = getSortedPostsData()
  console.log(articles, mkdArticles, 'articles data')
  return { props: { articles, mkdArticles, ctx: { query } } }
}

export default Home
