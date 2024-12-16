import { connect } from 'mongoose';
import 'dotenv/config'

const connectionString = process.env.MONGO_URL;

export class ConnectMongoDB {
  static #instance;
  constructor() {
    connect(connectionString);
  }

  static getInstance() {
    if (this.#instance) {
      console.log("Ya está coenctado a MongoDB!");
      return this.#instance;
    } else this.#instance = new ConnectMongoDB();
    console.log("Conectado a MongoDB");
    return this.#instance;
  }
}
