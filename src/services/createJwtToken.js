const jwt = require('jsonwebtoken');

class createJwtToken {

    static async generateJwt(user) {

        try {
            const token = jwt.sign({
                email: user.email,
                id: user.id
            }, "shhhhhhhh")
            return token

        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = createJwtToken;