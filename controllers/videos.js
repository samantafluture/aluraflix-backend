// Controla a rota de videos

// Importa model atendimento
const videos = require("../models/videos");
const Video = require("../models/videos");

module.exports = (app) => {
  // GET: recebe todos os dados
  app.get("/videos", (req, res) => {
    Video.lista(res);
  });

  // GET: recebe dados e filtra por ID
  app.get("/videos/:id", (req, res) => {
    // Params = nome do parâmetro (aqui é "id")
    // Converte de string para int
    const id = parseInt(req.params.id);

    Video.buscaPorId(id, res);
  });

  // POST: envia dados
  app.post("/videos", (req, res) => {
    // O conteúdo do body é um atendimento
    const video = req.body;

    // O video vai adicionar um video rs
    // "res" passa a resposta em diante
    Video.adiciona(video, res);
  });

  // PATCH: altera dados
  app.patch("/videos/:id", (req, res) => {
    // Params = nome do parâmetro (aqui é "id")
    // Converte de string para int
    const id = parseInt(req.params.id);
    // Valores estão no corpo da requisição
    const valores = req.body;

    Video.altera(id, valores, res);
  });

  // DELETE: deleta dados
  app.delete("/videos/:id", (req, res) => {
    // Params = nome do parâmetro (aqui é "id")
    // Converte de string para int
    const id = parseInt(req.params.id);

    Video.deleta(id, res);
  });
};
