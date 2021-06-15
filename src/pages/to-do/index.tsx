import Head from 'next/head';
import Link from 'next/link';
import { MainLayout } from 'components/layouts';
import { ListGroup } from 'react-bootstrap';
import { Todo } from 'models';
import db from 'libs/db';

export const getStaticProps = async () => {
  return {
    props: {
      toDos: db.getTodo()
    }
  };
};

const variants = ['light', 'primary', 'dark'];

export default function ToDoList({ toDos: Todo[] }) {
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
