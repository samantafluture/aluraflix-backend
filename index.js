const express = require("express");

const app = express();

app.listen(3000, () => console.log("servidor rodando na porta 3000"));

app.get("/videos", (req, res) => {
  res.send("você está na rota de vídeos");
});
