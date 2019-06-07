const Mailer = require("./mailer");
const ENV = require("@packages/config");

class UserMailer {
  static async sendVerificationEmail(newUser, token) {
    const confirmEmailLink = `${
      ENV.url.frontend
    }/verification?verificationToken=${token}`;

    const payload = {
      confirmEmailLink,
      name: newUser.name
    };

    return Mailer.send("email-confirmation", newUser.email, payload);
  }

  static async sendInvitationEmail(newUser, token) {
    const invitationLink = `${ENV.url.frontend}/signup?invitation=${
      user.invitation
    }`;

    const payload = {
      invitationLink
    };

    return Mailer.send("invitation", newUser.email, payload);
  }

  static async sendPasswordResetEmail(user, token) {
    const passwordResetLink = `${
      ENV.url.frontend
    }/reset-password?resetToken=${token}`;

    const payload = {
      passwordResetLink,
      name: user.name
    };

    return Mailer.send("password-reset", user.email, payload);
  }

  static async sendPasswordChangedEmail(user) {
    const payload = {
      name: user.name
    };

    return Mailer.send(
      "password-changed",
      user.email,
      payload,
      "_INSERT_DOMAIN_NAME_ <support@_INSERT_DOMAIN_NAME_.io>"
    );
  }
}

module.exports = UserMailer;
