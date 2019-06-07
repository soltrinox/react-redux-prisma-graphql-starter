"use strict";

const Agathias = require("agathias");

const { Strategy } = require("strigoaica-strategy");
const fs = require("fs");
const ENV = require("@packages/config");
const transport = require("@sendgrid/mail");
transport.setApiKey(ENV.sendgrid.apiKey);

class Sendgrid extends Strategy {
  constructor(options) {
    super();
    this.templatesPath = options.templatesPath;
    this.type = "sendgrid";

    this.logger = Agathias.getChild(this.type);
  }

  async send(templateId, data) {
    this.logger.debug({ templateId, data });

    if (data.to === undefined || data.payload === undefined) {
      return Promise.reject(new Error("Missing parameters"));
    }

    let mailOptions = this.loadLocalTemplateOptions(templateId);

    const recipients = Array.isArray(data.to) ? data.to : [data.to];

    const template = Strategy.fillMergeValueTemplate(
      mailOptions.html,
      data.payload
    );

    Object.assign(mailOptions, {
      from: data.from,
      to: recipients,
      html: template
    });

    console.log(mailOptions);

    return new Promise((resolve, reject) =>
      transport
        .send(mailOptions)
        .then(res => resolve(res))
        .catch(err => reject(err))
    );
  }

  loadLocalTemplateOptions(templateId) {
    let rawTemplate;
    try {
      rawTemplate = fs.readFileSync(
        `${this.templatesPath}/${templateId}.html`,
        {
          encoding: "utf-8"
        }
      );
    } catch (error) {
      return Promise.reject(error);
    }

    const meta = Strategy.extractMergeValueMeta(rawTemplate);

    return {
      subject: meta.subject,
      html: rawTemplate
    };
  }
}

module.exports = Sendgrid;
