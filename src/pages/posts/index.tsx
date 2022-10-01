import Head from 'next/head';
import { MainLayout } from 'src/components/layouts';
import { getSortedPostsData } from 'src/libs/post';
import Link from 'next/link';
import { GetStaticProps } from 'next';

import 'src/styles/utils.module.scss';

type Post = {
  date: string;
  title: string;
  id: string;
};

export default function Home({ allPostsData }: { allPostsData: Post[] }): React.ReactElement {
  return (
    <MainLayout home>
      <Head>
        <title>Trending posts</title>
      </Head>
      <section className="headingMd">
      </section>
      <section className={`$"headingMd} $"padding1px}`}>
        <h2 className="headingLg">Blog</h2>
        <ul className="list">
          {allPostsData.map(({ id, date, title }) => (
            <li className="listItem" key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className="lightText">{date}</small>
            </li>
          ))}
        </ul>
      </section>
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  };
};
