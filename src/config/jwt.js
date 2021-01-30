module.exports = {
    secret: process.env.JWT_SECRET || "secret",
    expiresIn: 10 * 60 * 1000 // 2 minutes
}