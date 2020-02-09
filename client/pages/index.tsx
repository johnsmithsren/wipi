import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { Row, List } from "antd";
import * as dayjs from "dayjs";
import { Layout } from "@/layout/Layout";
import { ArticleProvider } from "@providers/article";
import { TagMenus } from "@components/TagMenus";
import style from "./index.module.scss";

interface IHomeProps {
  articles: IArticle[];
}

const Home: NextPage<IHomeProps> = ({ articles = [] }) => {
  return (
    <Layout backgroundColor="#fff">
      <TagMenus />
      <Row className={style.articleList}>
        <List
          className={style.listContainer}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 4
          }}
          dataSource={articles}
          pagination={
            articles && articles.length > 12 ? { pageSize: 12 } : false
          }
          locale={{
            emptyText: "暂无数据"
          }}
          renderItem={article => (
            <List.Item className={style.articleListItem}>
              <div>
                <Link href={`/article/[id]`} as={`/article/${article.id}`}>
                  <a>
                    {article.cover && <img src={article.cover} alt="" />}
                    <div className={style.info}>
                      <p className={style.title}>{article.title}</p>
                      <p className={style.desc}>{article.summary}</p>
                      <p className={style.meta}>
                        {dayjs
                          .default(article.publishAt)
                          .format("YYYY-MM-DD HH:mm:ss")}
                      </p>
                    </div>
                  </a>
                </Link>
              </div>
            </List.Item>
          )}
        />
      </Row>
    </Layout>
  );
};

// 服务端预取数据
Home.getInitialProps = async () => {
  const [articles] = await Promise.all([ArticleProvider.getArticles(true)]);

  return { articles };
};

export default Home;
