import { Todo } from 'models/Todo';
import { NextApiRequest, NextApiResponse } from 'next';

type TodoRes = {
  name: string;
  data: Todo[];
};

export default (_: NextApiRequest, res: NextApiResponse<TodoRes>): void => {
  res.statusCode = 200;
  res.json({
    name: 'TO-DO LIST',
    data: []
  });
};
