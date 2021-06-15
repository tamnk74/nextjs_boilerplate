import Head from 'next/head';
import Link from 'next/link';
import { MainLayout } from '../../components/layouts';
import { ListGroup } from 'react-bootstrap';
import { Todo } from '../../models';
import { GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface IParams extends ParsedUrlQuery {
  id: string;
}

const toDos: Todo[] = [
  {
    name: 'Leaning Next Js',
    status: 1
  },
  {
    name: 'Leaning Nest Js',
    status: 2
  },
  {
    name: 'Leaning CI-CD',
    status: 0
  },
  {
    name: 'Leaning Testing',
    status: 0
  }
];

type PathData = {
  paths: { params: { id: string } }[];
  fallback: false;
};
// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths = async (): Promise<PathData> => {
  const paths = toDos.map((_, index) => {
    return {
      params: { id: `${index}` }
    };
  });

  return {
    paths,
    fallback: false
  };
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;

  return {
    props: {
      toDo: toDos[id] as Todo
    }
  };
};

const variants = ['light', 'primary', 'dark'];

export default function ToDo({ toDo }: { toDo: Todo }): React.ReactElement {
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
