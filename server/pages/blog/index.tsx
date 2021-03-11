import React from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Layout from '../../client/components/layout'

const DynamicArticle = dynamic(() =>
  import('../../client/components/article')
    .then((mod: any) => {
      console.log(mod.ArticleSection, 'mod')
      return mod
    })
    .catch((err) => {
      console.error('Error during loading module: ' + err)
    })
)

const ArticleSection: NextPage = () => {
  return (
    <Layout>
      <DynamicArticle />
    </Layout>
  )
}

export default ArticleSection
