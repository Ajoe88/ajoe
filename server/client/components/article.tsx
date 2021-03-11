import React from 'react'
import { NextPage, GetServerSidePropsContext } from 'next'
import Link from 'next/link.js'

import api from '../api'
import { getSortedPostsData } from '../lib/posts'
import { Article } from '../../src/article/Article'

type ArticleSectionProps = {
  articles: Array<Article>
  mkdArticles: Array<any>
  ctx: {
    query: Record<string, never>
  }
}

const ArticleSection: NextPage<ArticleSectionProps> = ({
  articles,
  mkdArticles,
}) => {
  return (
    <div className="article-section">
      <h1>Article List</h1>
      <h2>{JSON.stringify(articles)}</h2>
      <h2>{JSON.stringify(mkdArticles)}</h2>
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

        {mkdArticles &&
          mkdArticles.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/md/${id}`}>
                <a className="inline-block right-0 align-baseline font-light text-sm text-500 hover:text-red-400">
                  {title} - {date}
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export const getServerSideProps = async ({
  query,
  req,
  res,
}: GetServerSidePropsContext) => {
  const articles = await api('articles', req, res)
  const mkdArticles = getSortedPostsData()
  console.log(articles, mkdArticles, 'ssr data')

  return { props: { articles, mkdArticles, ctx: { query } } }
}

export default ArticleSection
