const keys = require('../keys')

module.exports = function (email, token) {
    return {
        to: email,
        from: keys.EMAIL_FROM,
        subject: "Reset of the password",
        html: `
        <h1>Have you forget your password?</h1>
        <p>If not - ignore this mail.</p>
        <p>Otherwise click the link below:</p>
        <p><a href="${keys.BASE_URL}/auth/password/${token}">Reset the password</a></p>
        <hr />
        <a href="${keys.BASE_URL}">The Courses Store</a>
        `
    }
}