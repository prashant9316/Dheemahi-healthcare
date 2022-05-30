const loginController = async(req, res) => {
    try {
        console.log(req.body.email)
        console.log(req.body.password)
        let email = req.body.email;
        let pass = req.body.password;
        console.log(email, pass)
        if(email == 'admin@drsanjaykumar.in' && pass == 'Admin@123'){
            return res.json({
                AuthToken: process.env.AuthToken,
                code: 200,
                status: 200
            })
        }else {
            return res.json({
                error: 'Failed to login!',
                code: 401,
                status: 401
            })
        }
    } catch (error) {
        return res.json({
            error: "Server error!",
            code: 500,
            status: 500
        })
    }
}

module.exports = {
    loginController
}