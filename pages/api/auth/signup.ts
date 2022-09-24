import { NextApiRequest, NextApiResponse } from "next";
import { hashNsalt } from "../../../lib/auth-helper";
import { connectMongo } from "../../../lib/mongo-helper"

const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_DB) {
    throw new Error('MONGODB_DB is not defined.')
}

interface SignupApiRequest extends NextApiRequest {
    body: {
        fullname: string;
        email: string;
        password: string;
    };
}

interface SignupApiResponse extends NextApiResponse {

}

const handler = async (req: SignupApiRequest, res: SignupApiResponse) => {
    const { body } = req;
    const { fullname, email, password } = body;
    if (!email || !email.includes('@') || !password || password.trim().length < 8) {
        res.status(400).json({ message: 'Invalid data' });
        return;
    }

    const client = await connectMongo();
    const db = client.db(MONGODB_DB);

    const dbuser = await db.collection('user').findOne({
        email: email
    })

    if (dbuser) {
        res.status(422).json({ message: 'User already exist with same email'})
        client.close();
        return;
    }

    const hashedPass = await hashNsalt(password);
    const result = await db.collection('user').insertOne({
        fullname: fullname,
        email: email,
        password: hashedPass
    });

    res.status(201).json({ message: 'Created user.' })
    client.close();
}

export default handler;
