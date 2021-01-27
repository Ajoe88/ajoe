import React from "react";

import { NextPage, GetServerSidePropsContext } from "next";
import { Article } from "../../../src/article/Article";
import nookies from "nookies";

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
  query,
  req,
}: GetServerSidePropsContext) => {
  const cookies = nookies.get({ req });
  const content = await fetch(
    `http://localhost:3000/api/articles/${query.id}`,
    {
      headers: {
        Authorization: cookies.token,
      },
    }
  );
  const article = await content.json();
  return { props: { article } };
};

export default ArticlePage;
