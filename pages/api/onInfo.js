import main from "@/db/conn"
import Info from "@/model/infoSchema"

export default function getPost(req, res) {
    main().catch(error => console.error(error))
    const { method } = req;
    switch (method) {
        case 'GET':
            Info.find({}, function (err, datas) {
                if (err) {
                    res.send("something went wrong")
                    next();
                }
                res.status(200).json(datas)
            });
            break;
        case 'PUT':
            const { cp, cw } = req.body;
            console.log(req.body)
            try {
                if (!cp || !cw) {
                    return res.status(422).json({ error: "No proper data" })
                }
                Info.findByIdAndUpdate("63c91277812da6040c1dd161", { $set: { cp: cp, cw: cw } },
                    (err, updatedObj) => {
                        if (err) {
                            res.status(422).json({ status: false, error: "Item not updated" });
                        }
                        else {
                            res.status(200).json({ updatedObj });
                        }
                    })
            } catch (err) {
                console.log(err);
            }
            break;
        default:
            res.setHeader('Allow',['GET','PUT'])
            res.status(405).send( `Method ${method} Not Allowed`)
    }

}


