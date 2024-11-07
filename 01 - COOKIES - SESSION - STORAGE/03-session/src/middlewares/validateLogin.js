export const validateLogin = (req, res, next) =>{
    if(req.session && req.session.info.loggedIn) next()
        else res.status(401).json({msg: 'no autorizado'})
}