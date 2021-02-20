import React from 'react'
import { NextPage, GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import api from '../../client/api'
import Layout from '../../client/components/layout'
import { Article } from '../../src/article/Article'
import Date from '../../client/lib/date'

type ArticlePageProps = {
  article: Article
}

const ArticlePage: NextPage<ArticlePageProps> = ({ article }) => {
  return (
    <Layout>
      <Head>
        <title>{article.Title}</title>
      </Head>
      <article>
        <h1 className="">{article.Title}</h1>
        <div className="">
          <Date dateString={article.createdAt.toString()} />
        </div>
        <pre
          className=""
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>
    </Layout>
  )
}

export const getServerSideProps = async ({
  query,
  req,
  res,
}: GetServerSidePropsContext) => {
  const article = await api(`articles/${query.id}`, req, res)
  return { props: { article } }
}

export default ArticlePage
