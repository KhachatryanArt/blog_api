const jwt = require("jsonwebtoken");

module.exports = async (ctx, next) => {
    try {
        const token = ctx.request.header.authorization;

        ctx.state.user = jwt.verify(token, 'shhhhhhhh', function (err, decoded) {
            return decoded
        });
        await next();
    } catch (error) {
        console.error(error)
    }
};