import passport from 'passport';

export const passportCall = (strategy) => {
    return async(req, res, next)=>{
        passport.authenticate(strategy, (err, user, info)=>{
            if(err) return next(err);
            if(!user) return res.status(401).json({
                error: info.messages ? info.messages : info.toString()
            });
            req.user = user;
            console.log(req.user)
            next();
        })(req, res, next);
    }
}