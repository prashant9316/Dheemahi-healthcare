const verifyAdmin = async(req, res, next) => {
    try {
        const token = req.cookies.AuthToken;
        console.log(token)
        if(token == process.env.AuthToken){
            next();
        } else {
            return res.redirect('/')
        }
    } catch (error) { 
        console.log(error)
        return res.json({ error })
    }
}

module.exports = {
    verifyAdmin
}