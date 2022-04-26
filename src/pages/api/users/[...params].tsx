import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.query);
    
  const user = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "John Doe" },
    { id: 3, name: "John Doe" },
  ];

  return res.json(user);
};
