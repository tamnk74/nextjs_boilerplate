import { MainLayout } from 'src/components/layouts';
import { getAllPostIds, getPostData } from 'src/libs/post';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';

import 'src/styles/utils.module.scss';

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
    <MainLayout post siteTitle={postData.title}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className='px-12 pt-6 pb-16'>
        <h1 className="text-h1 text-info">{postData.title}</h1>
        <div className="text-light-600 pb-12">{postData.date.toString()}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </MainLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();
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
