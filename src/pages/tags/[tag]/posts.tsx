import Head from 'next/head';
import { MainLayout } from 'src/components/layouts';
import { getSortedPostsData } from 'src/libs/post';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';

import 'src/styles/utils.module.scss';

export type Post = {
  date: string;
  title: string;
  id: string;
  tags?: string[]
};

export default function Post({ allPostsData }: { allPostsData: Post[] }): React.ReactElement {
  return (
    <MainLayout post>
      <Head>
        <title>Trending posts</title>
      </Head>
      <section className="headingMd">
      </section>
      <section className="container px-12">
        <h2 className=" text-h2 py-6 border-b-4">Trending Posts</h2>
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
                <a className="text-dark underline px-1">{tag}</a>
              </Link>))
              }
            </li>
          ))}
        </ul>
      </section>
    </MainLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const tags =   (await import('src/data/tags/index.json')).default;
  return {
    paths: tags.map(tag => ({
      params: {tag},
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPostsData = await getSortedPostsData(params?.tag as string);
  return {
    props: {
      allPostsData
    }
  };
};
