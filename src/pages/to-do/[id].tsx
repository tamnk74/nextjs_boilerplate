import Head from 'next/head';
import Link from 'next/link';
import { MainLayout } from '../../components/layouts';
import { ListGroup } from 'react-bootstrap';
import { Todo } from '../../models';
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
  // eslint-disable-next-line no-console
  console.log(11111, data);
  return {
    props: {
      toDo: data
    }
  };
};

const variants = ['light', 'primary', 'dark'];

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
        <ListGroup>
          <ListGroup.Item variant={variants[toDo.status]}>
            <Link href={'/to-do/'}>{toDo.name}</Link>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </MainLayout>
  );
}
