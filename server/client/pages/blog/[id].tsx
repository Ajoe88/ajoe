import React from "react";

import { NextPage, GetServerSidePropsContext } from "next";
import { Article } from "../../../src/article/Article";
import api from "../../api";

type ArticlePageProps = {
  article: Article
}

const ArticlePage: NextPage<ArticlePageProps> = ({ article }) => {
  return (
    <div>
      <h1>{article.Title}</h1>
      <div>{article.content}</div>
    </div>
  );
}

export const getServerSideProps = async ({
  query, req, res
}: GetServerSidePropsContext) => {
  const article = await api(`articles/${query.id}`, req, res);
  return { props: { article } };
};

export default ArticlePage;
