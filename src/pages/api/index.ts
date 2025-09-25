import { NextApiRequest, NextApiResponse } from 'next';

export default (_: NextApiRequest, res: NextApiResponse): void => {
  res.statusCode = 200;
  res.json({
    name: 'API LIST',
    data: [
      {
        method: 'GET',
        path: '/to-do'
      }
    ]
  });
};
