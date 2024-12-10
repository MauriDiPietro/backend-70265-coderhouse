import * as prodDaoMongo from './mongodb/mongo.dao.js'
import * as prodDaoFS from './filesystem/fs.dao.js';

let prodDao = null;
let persistence = process.argv[2];

switch (persistence) {
    case 'fs':
        prodDao = prodDaoFS;
        break;
    case 'mongo':
        initMongoDB().then(()=>console.log('db conectada')).catch((error)=>console.log(error));
        prodDao = prodDaoMongo;
    default:
        break;
}

export default { prodDao }

