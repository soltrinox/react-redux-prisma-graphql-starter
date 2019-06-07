const axios = require("axios");
const config = require("@packages/config");

class Mailer {
  static send(templateId, to, payload, from) {
    const body = {
      strategies: config.mailer.strategy,
      data: {
        from: from || config.mailer.emailDefaultFrom,
        payload,
        to
      },
      templateId
    };

    axios
      .post(config.mailer.strigoaicaEndpoint, body)
      .then(res => void 0)
      .catch(err => console.log(err.message));
  }
}

module.exports = Mailer;
