import React from "react";
import { NextPage, GetServerSidePropsContext } from "next";
import nookies from "nookies";
import Link from 'next/link.js';
import api from '../api'
import { Article } from "../../src/article/Article";
import redirect from "../redirect";

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
  res,
}: GetServerSidePropsContext) => {
  const articles = await api(req, res, "articles");
  return { props: { articles, ctx: { query } } };
};

export default Home;
