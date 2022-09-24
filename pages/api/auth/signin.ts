import { NextApiRequest, NextApiResponse } from "next";
import { getHash, hashNsalt } from "../../../lib/auth-helper";
import { connectMongo } from "../../../lib/mongo-helper"

const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_DB) {
    throw new Error('MONGODB_DB is not defined.')
}

interface SigninApiRequest extends NextApiRequest {
    body: {
        email: string;
        password: string;
    };
}

interface SigninApiResponse extends NextApiResponse {

}

const handler = async (req: SigninApiRequest, res: SigninApiResponse) => {
    const { body } = req;
    const { email, password } = body;
    if (!email || !email.includes('@') || !password || password.trim().length < 8) {
        res.status(422).json({ message: 'Invalid data' });
        return;
    }

    const client = await connectMongo();
    const db = client.db(MONGODB_DB);
    const dbuser = await db.collection('user').findOne({
        email: email
    })

    if (!dbuser) {
        res.status(401).json({ message: 'Signin failed.'  });
        client.close();
        return;
    }

    const [salt, storedHash] = dbuser.password.split('.');
    console.log('stored = ', storedHash);
    const hash = await getHash(password, salt);
    console.log('hash = ', hash);

    if (storedHash !== hash) {
        res.status(401).json({ message: 'Singin failed.' });
        client.close();
        return;
    }

    res.status(201).json({ message: 'Signin success.' })
    client.close();
}

export default handler;
