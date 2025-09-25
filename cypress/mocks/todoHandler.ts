import { rest } from 'msw';

type Todo = {
  id: number;
  name: string;
  status: number;
};

type CreateTodoBody = {
  name: string;
};

const toDoList: Todo[] = [];

export const todoHandlers = [
  rest.post<CreateTodoBody, Todo>('http://localhost:3000/api/todos', (req, res, ctx) => {
    // eslint-disable-next-line no-console
    console.log('Create todo', req.body);
    toDoList.push({
      id: Math.round(Math.random() * Math.random() * 1000),
      name: req.body.name,
      status: 0
    });
    return res(
      ctx.status(201),
      ctx.json<Todo>({
        id: Math.round(Math.random() * Math.random() * 1000),
        name: req.body.name,
        status: 0
      })
    );
  }),
  rest.get<Todo[]>('http://localhost:3000/api/todos', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json<Todo[]>(toDoList));
  })
];
