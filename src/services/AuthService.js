const User = require("../db/models/User");
const bcrypt = require("bcrypt");
const createJwtToken = require("./createJwtToken")

class AuthService {
    static async register(firstName, lastName, email, password) {
        const hash = bcrypt.hashSync(password, 8);

        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash
        });
        await user.save();
    }

    static async login(email, password) {
        let token = 0;
        const user = await User.findOne({where: {email: email}})
        if (user) {
            const match = await bcrypt.compare(password, user.password)
            if (match) {
                token = await createJwtToken.generateJwt(user)
                return token
            }
        } else {
            return token = false
        }

    }
}

module.exports = AuthService;