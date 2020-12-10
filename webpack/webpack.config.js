const { merge } = require("webpack-merge");

const commonConfiguration = require("./webpapck/common");

module.exports = (_env, { mode }) => {
  const properlyConfig = require(`./webpack/${mode}`);
  const mergedConfig = merge(commonConfiguration, properlyConfig);

  return mergedConfig;
};
