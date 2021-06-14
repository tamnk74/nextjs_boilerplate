import Head from 'next/head';
import Link from 'next/link';
import { MainLayout } from '../../components/layouts';
import { ListGroup } from 'react-bootstrap';
import { Todo } from '../../models';
import { GetStaticProps } from 'next';

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

export const getStaticPaths = async () => {
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

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params.id as string;

  return {
    props: {
      toDo: toDos[id]
    }
  };
};

const variants = ['light', 'primary', 'dark'];

export default function ToDo({ toDo }) {
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
