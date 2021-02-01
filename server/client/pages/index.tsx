import React from "react";
import { NextPage, GetServerSidePropsContext } from "next";
import Link from "next/link.js";
import api from "../api";
import { Article } from "../../src/article/Article";
import Header from "../components/header";
import { UserContextProvider } from "../context/usersContext";
import Users from '../components/users'

type HomePageProps = {
  articles: Array<Article>;
  ctx: {
    query: Record<string, never>;
  };
};

const Home: NextPage<HomePageProps> = ({ articles }) => {
  return (
    <UserContextProvider>
      <div>
        <Header />
        <h1>Article List</h1>
        <ul>
          {Array.isArray(articles) &&
            articles.map((article) => (
              <li key={article.id}>
                <Link href={`/blog/${article.id}`} prefetch>
                  <a className="inline-block right-0 align-baseline font-light text-sm text-500 hover:text-red-400">
                    {article.Title}
                  </a>
                </Link>
              </li>
            ))}
        </ul>
        <Users />
      </div>
    </UserContextProvider>
  );
};

export const getServerSideProps = async ({
  query,
  req,
  res,
}: GetServerSidePropsContext) => {
  const articles = await api("articles", req, res);
  return { props: { articles, ctx: { query } } };
};

export default Home;
