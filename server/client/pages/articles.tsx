
import React from 'react'
import { NextPage } from 'next'

type ArticlesPageProps = {
  articles: Array<String>
}

const Articles: NextPage<ArticlesPageProps> = ({ articles }) => {
    return <p>Name: Test</p>
}

export default Articles
