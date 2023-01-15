const sgEmail = require("@sendgrid/mail");

sgEmail.setApiKey(process.env.SENDGRID_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "al.imm.2.6d@gmail.com" };
  await sgEmail.send(email);
  return true;
};

module.exports = sendEmail;
