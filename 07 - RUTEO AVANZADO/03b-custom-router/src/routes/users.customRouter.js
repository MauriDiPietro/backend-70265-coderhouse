import Router from './class.customRouter.js';
import { userController } from '../controllers/user.controller.js';
import { passportCall } from '../passport/passportCall.js';

class UserCustomRouter extends Router {
    init(){
        this.get('/', ['PUBLIC'], (req, res)=>res.send('ruta publica'));
        this.post("/register", ['PUBLIC'], userController.register);
        this.post("/login", ['PUBLIC'], userController.login);
        this.get("/private-cookies", ['USER', 'ADMIN'], passportCall('jwtCookies'), userController.privateData);
        this.get("/private-cookies-admin", ['admin'], passportCall('jwtCookies'), userController.privateData);
    }
}

export const userCustomRouter = new UserCustomRouter();