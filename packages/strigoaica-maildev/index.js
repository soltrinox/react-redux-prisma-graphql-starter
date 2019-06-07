"use strict";

const Agathias = require("agathias");

const { Strategy } = require("strigoaica-strategy");
const fs = require("fs");
const ENV = require("@packages/config");
const nodemailer = require("nodemailer");

class Maildev extends Strategy {
  constructor(options) {
    super();
    this.templatesPath = options.templatesPath;
    this.type = "maildev";
    this.smtpTransport = nodemailer.createTransport({
      port: 1025,
      ignoreTLS: true
    });
    this.logger = Agathias.getChild(this.type);
  }

  async send(templateId, data) {
    this.logger.debug({ templateId, data });

    if (data.to === undefined || data.payload === undefined) {
      return Promise.reject(new Error("Missing parameters"));
    }

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
    const template = Strategy.fillMergeValueTemplate(rawTemplate, data.payload);

    let mailOptions = {
      from: data.from,
      to: data.to,
      subject: meta.subject,
      html: template
    };

    return new Promise((resolve, reject) =>
      this.smtpTransport.sendMail(mailOptions, (error, result) =>
        error ? reject(error) : resolve(result)
      )
    );
  }
}

module.exports = Maildev;
