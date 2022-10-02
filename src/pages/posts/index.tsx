import Head from 'next/head';
import { MainLayout } from 'src/components/layouts';
import { getSortedPostsData } from 'src/libs/post';
import Link from 'next/link';
import { GetStaticProps } from 'next';

import 'src/styles/utils.module.scss';

export type Post = {
  date: string;
  title: string;
  id: string;
  tags?: string[]
};

export default function Post({ allPostsData }: { allPostsData: Post[] }): React.ReactElement {
  return (
    <MainLayout>
      <Head>
        <title>Trending posts</title>
      </Head>
      <section className="headingMd">
      </section>
      <section className="container px-12">
        <h2 className=" text-h2 pt-6 pb-1 mb-4 border-b-4">Trending Posts</h2>
        <ul className="list">
          {allPostsData.map(({ id, date, title, tags }) => (
            <li className="border-b-2" key={id}>
              <Link href={`/posts/${id}`}>
                <a className="text-primary underline">{title}</a>
              </Link>
              <br />
              <small className="text-secondary">{date}</small> <span> | </span>
              {
                tags?.map(tag => (<Link href={`tags/${tag}/posts/`}>
                <a className="text-grad-dark underline px-1" key={tag}>{tag}</a>
              </Link>))
              }
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
