import { prodDaoFS } from "./filesystem/product.dao.js";
import { prodDaoMongo } from "./mongodb/product.dao.js";
import { userDaoMongo } from "./mongodb/user.dao.js";
import { initMongoDB } from "./mongodb/db/connection.js";
import { userDaoFS } from "./filesystem/user.dao.js";
import { prodDaoMySql } from "./mysql/product.dao.js";
import { initMySqlDB } from "./mysql/db/connection.js";

let userDao = null;
let prodDao = null;
let persistence = process.argv[2];

switch (persistence) {
  case "fs":
    userDao = userDaoFS;
    prodDao = prodDaoFS;
    console.log(persistence);
    break;
  case "mysql":
    // userDao = userDaoMySql;
    prodDao = prodDaoMySql;
    console.log(persistence);
    initMySqlDB()
      .then(() => console.log("base de datos MYSQL coenctada"))
      .catch((error) => console.log(error));
    break;
  case "mongo":
    initMongoDB()
      .then(() => console.log("base de datos MONGO coenctada"))
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
