// Configura o app no Express

// Imports
const express = require("express");
const consign = require("consign");

// Configura o app
module.exports = () => {
  // Declara variável do app
  const app = express();

  // Parseia o body
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Inclui controllers no app usando consign
  consign().include("controllers").into(app);

  // Devolve o app
  return app;
};
