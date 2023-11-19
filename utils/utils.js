const crypto = require("crypto");

const generateRandomToken = (projectId) => {
  const randomToken = crypto.randomBytes(20).toString("hex");
  const expiration = new Date(Date.now() + 3600000);
  const token = {
    projectId: projectId,
    token: randomToken,
    expiry: expiration,
  };

  return token;
};

module.exports = generateRandomToken;
