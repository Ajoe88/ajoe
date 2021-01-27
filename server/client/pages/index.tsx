import React from "react";
import { NextPage, GetServerSidePropsContext } from "next";
import nookies from "nookies";
import Link from 'next/link.js';

import { Article } from "../../src/article/Article";

type HomePageProps = {
  articles: Array<Article>;
  ctx: any;
  cookies: any;
};

const Home: NextPage<HomePageProps> = ({ articles, ctx }) => {
  return (
    <div>
      <h1>Article List</h1>
      <ul>
        {Array.isArray(articles) && articles.map((article) => (
          <li key={article.id}>
            <Link href={`/blog/${article.id}`} prefetch>
              <a className="inline-block right-0 align-baseline font-light text-sm text-500 hover:text-red-400">
                {article.Title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <p>Ctx: {JSON.stringify(ctx)}</p>
    </div>
  );
};

export const getServerSideProps = async ({
  query,
  req,
}: GetServerSidePropsContext) => {
  const cookies = nookies.get({ req });
  const content = await fetch("http://localhost:3000/api/articles", {
    headers: {
      Authorization: cookies.token,
    },
  });
  const articles = await content.json();
  return { props: { articles, ctx: { query } } };
};

export default Home;
