const keys = require('../keys')

module.exports = function (email) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: "Account has been created",
        html: `
        <h1>Welcome to our Store</h1>
        <p>You have successfully created the account using email - ${email}</p>
        <hr />
        <a href="${keys.BASE_URL}">The Courses Store</a>
        `
    }
}