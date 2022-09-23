import { NextApiRequest, NextApiResponse } from "next";
import { hashNsalt } from "../../../lib/auth-helper";
import { connectMongo } from "../../../lib/mongo-helper"

const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_DB) {
    throw new Error('MONGODB_DB is not defined.')
}

interface UserNextApiRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

interface UserNextAPIRequest extends NextApiResponse {

}

const handler = async (req: UserNextApiRequest, res: UserNextAPIRequest) => {
    const { body } = req;
    const { email, password } = body;
    if (!email || !email.includes('@') || !password || password.trim().length < 8) {
        res.status(422).json({ message: 'Invalid data' });
        return;
    }

    const client = await connectMongo();
    const db = client.db(MONGODB_DB);
    const hashedPass = await hashNsalt(password);
    const result = await db.collection('user').insertOne({
        email: email,
        password: hashedPass
    });

    res.status(201).json({ message: 'Created user.' })
}

export default handler;
