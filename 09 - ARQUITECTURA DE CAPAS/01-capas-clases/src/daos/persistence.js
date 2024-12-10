import { prodDaoFS } from "./filesystem/product.dao.js";
import { prodDaoMongo } from "./mongodb/product.dao.js";
import { userDaoMongo } from "./mongodb/user.dao.js";
import { initMongoDB } from "../db/connection.js";
import { userDaoFS } from "./filesystem/user.dao.js";

let userDao = null;
let prodDao = null;
let persistence = process.argv[2];

switch (persistence) {
  case "fs":
    userDao = userDaoFS;
    prodDao = prodDaoFS;
    console.log(persistence);
    break;
  case "mongo":
    initMongoDB()
      .then(() => console.log("base de datos coenctada"))
      .catch((error) => console.log(error));
    userDao = userDaoMongo;
    prodDao = prodDaoMongo;
    console.log(persistence);
    break;
  default:
    userDao = userDaoFS;
    prodDao = prodDaoFS;
    break;
}

export default { userDao, prodDao };
