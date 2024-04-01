let jwtModule = require('../jwt/jwtToken')
let auth = {
    "verifyJwt": async (req, res, next) => {
        const token = req.headers['token'];
        if (!token) {
            return await res.status(401).json({
                status: 401,
                response: 'Access Denied'
            })
        }
        try {
            let bodyParam = { token, secretKey: process.env.TOKEN_SECRET }
            await jwtModule.verify(bodyParam, function (err, response) {
                if (err) {
                    return res.status(400).json({
                        user: req.user,
                        status: 400,
                        response: 'Invalid Token'
                    })
                }
                next();
            })
        }
        catch (err) {
            res.status(400).json({
                user: req.user,
                status: 400,
                response: 'Invalid Token'
            })
        }
    },
}
module.exports = auth