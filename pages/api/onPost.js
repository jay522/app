import main from "@/db/conn"
import Data from "@/model/postSchema"

export default async function getPost(req, res) {
    main().catch(error => console.error(error))
    const { method } = req;
    switch (method) {
        case 'GET':
            Data.find({}, function (err, datas) {
                if (err) {
                    res.send("something went wrong")
                    next();
                }
                res.status(200).json(datas)
            });
            break;
        case 'POST':
            const { name, age, type, date, loc, id, head, desc, img } = req.body;
            // console.log(req.body)
            try {
                if (!name || !age || !type || !date || !loc || !id || !head || !desc || !img) {
                    return res.status(422).json({ error: "Please fill the field properly" })
                }
                try {
                    const data = new Data(req.body);
                    await data.save();
                    res.status(201).json({ message: "sent successfully" });
                } catch (err) {
                    console.log(err);
                }
            } catch (err) {
                console.log(err);
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).send(`Method ${method} Not Allowed`)
    }
}
