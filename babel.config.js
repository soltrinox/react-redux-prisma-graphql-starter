module.exports = {
  overrides: [
    {
      test: "poltrex-ui",
      extends: "poltrex-ui/babel.config.js"
    },
    {
      test: "poltrex-mock-backend",
      extends: "poltrex-mock-backend/babel.config.js"
    }
  ]
};
