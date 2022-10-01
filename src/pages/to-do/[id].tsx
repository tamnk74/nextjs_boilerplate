import Head from 'next/head';
import Link from 'next/link';
import { MainLayout } from 'src/components/layouts';
import { Todo } from 'src/models';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import axios from 'axios';

interface IParams extends ParsedUrlQuery {
  id: string;
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  };
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const { data } = await axios.get<{ data: Todo }>('http://localhost:3000/api/todos/' + id);

  return {
    props: {
      toDo: data
    }
  };
};

type PropsType = {
  toDo: Todo;
};

export default function ToDo({ toDo }: PropsType): React.ReactElement {
  return (
    <MainLayout>
      <Head>
        <title>{toDo.name}</title>
      </Head>
      <div className="container">
        <div>
          <div>
            <Link href={'/to-do/'}>{toDo.name}</Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
