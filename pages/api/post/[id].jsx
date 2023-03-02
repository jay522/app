import main from "@/db/conn"
import Data from "@/model/postSchema";

export default async function getPost(req, res) {
  const { id } = req.query;
  main().catch(error => console.error(error))
  const { method } = req;
  switch (method) {
    case 'GET':
      Data.find({}, function (err, datas) {
        if (err) {
          res.send("something went wrong")
          next();
        }
        if (datas) {
          const post=datas.find(value => value._id == id)
          res.status(200).json(post)
        }
        else{res.status(404).json({error:"Post Not Found"})}
      });
      break;
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).send(`Method ${method} Not Allowed`)
  }
}
