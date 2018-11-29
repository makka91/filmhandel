const jwt = require('jsonwebtoken');

function authorization(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized for accessing this operation");

    } let token = req.headers.authorization.split(' ')[1]
    if (token === "null") {
        return res.status(401).send("Unauthorized for accessing this operation");
    }
    let payload = jwt.verify(token, "secretKey")
    if (!payload) {
        res.status(401).send("Unauthorized for accessing this operation")
    }
    req.userId = payload.subject
    next();
}

module.exports = authorization;