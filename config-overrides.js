const {
  override,
  addDecoratorsLegacy
} = require("customize-cra");
 
// module.exports = override(
//   addDecoratorsLegacy(),
// );

module.exports = {
  jest: (config) => {
    // config.collectCoverageFrom = ["src/components/**/*.{js,jsx}"];
    config.testMatch = [
      '<rootDir>/src/**/*[t|T]est.{js,jsx}',
    ];
    return config;
  }
}