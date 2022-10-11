import { MongoClient } from 'mongodb';

const MONGODB_DB = process.env.MONGODB_DB;

interface User {
    fullname: string,
    email: string,
    password: string
}

export const getUserByEmail = async (client: MongoClient, email: string) => {
    const db = client.db(MONGODB_DB);
    return await db.collection('user').findOne({
        email: email
    })
}

export const putUser = async (client: MongoClient, user: User) => {
    const db = client.db(MONGODB_DB);
    return await db.collection('user').insertOne(user);
}