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
    data: [
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
  });
};
