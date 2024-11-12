export const isAdmin = (req, res, next) =>{
    if(req.session && req.session.info.admin) next()
        else res.status(401).json({msg: 'no autorizado, solo usuarios admin'})
}