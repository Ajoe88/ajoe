import Head from 'next/head'

import Layout from '../../client/components/layout'
import { getAllPostIds, getPostData } from '../../client/lib/posts'
import Date from '../../client/lib/date'

type Post = {
  postData: {
    title: string
    contentHtml: string
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
        <h1 className="text-3xl text-center my-10">{postData.title}</h1>
        <div className="markdown text-right my-2 text-xs">
          <Date dateString={postData.date.toString()} />
        </div>
        <section
          className="bg-gray-900 bg-opacity-75 rounded-md p-6"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: Params) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData,
    },
  }
}
