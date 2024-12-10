import { connect } from 'mongoose';
import 'dotenv/config'

const connectionString = process.env.MONGO_URL;

export const initMongoDB = async() => {
  try {
    await connect(connectionString);
  } catch (error) {
    throw new Error(error)
  }
}
