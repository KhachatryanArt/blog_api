const AuthService = require('../services/AuthService')
const SendEmail = require("../services/EmailService")

class AuthController {
    static async register(ctx) {
        const {firstName, lastName, email, password} = ctx.request.body;
        await AuthService.register(firstName, lastName, email, password);
        await SendEmail.sendEmail(email, firstName)
        ctx.status = 201;
        ctx.body = 'User successfully registered!'
    }

    static async login(ctx) {

        const {email, password} = ctx.request.body;
        const userJwt = await AuthService.login(email, password);

        console.log(userJwt)
        if (userJwt) {
            ctx.body = "The user successfully logged";

            ctx.request.headers.auth = userJwt
        } else {
            ctx.body = "Incorrect Email or Password"
        }
        return userJwt;
    }
}

module.exports = AuthController;