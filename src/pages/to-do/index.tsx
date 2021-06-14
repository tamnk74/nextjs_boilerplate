import Head from 'next/head';
import Link from 'next/link';
import { MainLayout } from 'components/layouts';
import { ListGroup } from 'react-bootstrap';

export const getStaticProps = async () => {
  return {
    props: {
      toDos: [
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
      ]
    }
  };
};

const variants = ['light', 'primary', 'dark'];

export default function ToDo({ toDos }) {
  return (
    <MainLayout>
      <Head>
        <title>Todo List</title>
      </Head>
      <div className="container">
        <ListGroup>
          {toDos.map((todo, index) => (
            <ListGroup.Item variant={variants[todo.status]} key={index}>
              <Link href={'/to-do/' + index}>{todo.name}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </MainLayout>
  );
}
