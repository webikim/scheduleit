import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined.')
}

export const connectMongo = async () => {
    const client = await MongoClient.connect(MONGODB_URI);
    return client;
}