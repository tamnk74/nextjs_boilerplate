import Head from 'next/head';
import { MainLayout } from 'components/layouts';
import { getSortedPostsData } from 'libs/post';
import Link from 'next/link';
import { GetStaticProps } from 'next';

import 'styles/utils.module.scss';

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
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
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

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  };
};
