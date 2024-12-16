import { connect } from "mongoose";

class ConnectMongoDB {
  static #instance;
  constructor() {
    connect("mongodb://127.0.0.1:27017/coderhouse");
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

const conn1 = ConnectMongoDB.getInstance();
const conn2 = ConnectMongoDB.getInstance();
const conn3 = ConnectMongoDB.getInstance();
