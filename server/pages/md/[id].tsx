import Head from 'next/head'

import Layout from '../../client/components/layout'
import { getAllPostIds, getPostData } from '../../client/lib/posts'
import Date from '../../client/lib/date'
import utilStyles from '../../client/styles/utils.module.css'

type Post = {
  postData: {
    title: string,
    contentHtml: string,
    date: Date
  }
}

type Params = {
  params: {
    id: string
  }
}

export default function Post({ postData }: Post) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date.toString()} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: Params) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}