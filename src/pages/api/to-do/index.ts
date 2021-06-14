import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
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
