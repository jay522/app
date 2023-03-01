import main from "@/db/conn"
import User from "@/model/userSchema"

export default async function getPost(req, res) {
    main().catch(error=>console.error(error))
    const { method } = req;
    switch (method) {
       
        case 'POST':
            const { name, email, phone, subject, message } = req.body;
            console.log(req.body)
            try {
                if (!name || !email || !phone || !subject || !message) {
                    return res.status(422).json({ error: "Please fill the field properly" })
                }
                try {
                    const userExist = await User.findOne({ email: email })
                    if (userExist) {
                        return res.status(201).json({ message: "We already got message" });
                    }
                    const user = new User(req.body);
                    await user.save();
                    res.status(201).json({ message: "sent successfully" });
                } catch (err) {
                    console.log(err);
                }
            } catch (err) {
                console.log(err);
            }
            break;
        default:
            res.setHeader('Allow',['POST'])
            res.status(405).send( `Method ${method} Not Allowed`)
    }
}
