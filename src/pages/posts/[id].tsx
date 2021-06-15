import { MainLayout } from 'components/layouts';
import { getAllPostIds, getPostData } from 'libs/post';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';

import 'styles/utils.module.scss';

export default function Post({
  postData
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}): React.ReactElement {
  return (
    <MainLayout siteTitle={postData.title}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className="headingXl">{postData.title}</h1>
        <div className="lightText">{postData.date.toString()}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </MainLayout>
  );
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData
    }
  };
};
