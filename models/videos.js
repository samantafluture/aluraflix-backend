// Modelo de vídeo

// Imports
const conexao = require("../infra/conexao");

class Video {
  // Método para POST
  adiciona(video, res) {
    // Validação do campos: título, descrição e url (campos obrigatórios)
    const tituloIsValid = video.titulo.length >= 5;
    const descricaoIsValid = video.descricao.length >= 5;
    const urlIsValid = video.url.length >= 5;

    // Array de validações com nome do campo, validação e mensagem de erro
    const validacoes = [
      {
        nome: "titulo",
        valido: tituloIsValid,
        mensagem: "Título do vídeo deve ter pelo menos 5 caracteres",
      },
      {
        nome: "descricao",
        valido: descricaoIsValid,
        mensagem: "Descrição do vídeo deve ter pelo menos 5 caracteres",
      },
      {
        nome: "url",
        valido: urlIsValid,
        mensagem: "URL do vídeo deve ter pelo menos 5 caracteres",
      },
    ];

    // Se este campo não for válido, salvo este campo nos erros
    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      // Se tiver erros, chama o objeto de erros
      res.status(400).json(erros);
    } else {
      // Adiciona no objeto todas as infos do vídeo mais as infos validadas
      const videoValidado = { ...video };
      // Cria a query sql para inserir dados na tabela
      const sql = "INSERT INTO Videos SET ?";

      // Passar para a conexão 3 parâmetros: query, objeto, função
      conexao.query(sql, videoValidado, (erro, resultados) => {
        if (erro) {
          // envia resposta no formato "json"
          // 400 - Status http de erro "bad request"
          res.status(400).json(erro);
        } else {
          // 200 - Status http de sucesso "created"
          // envia de volta o atendimento cadastrado com sucesso
          res.status(201).json(video); 
        }
      });
    }
  }

  // Método para GET
  lista(res) {
    // Query sql para pegar os dados da tabela Atendimentos
    const sql = "SELECT * FROM Videos";

    // Envia a query e recebe erros e resultados
    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json();
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  // Método para GET por parâmetro (filtrado)
  buscaPorId(id, res) {
    // Filtrar pelo id que estamos recebendo
    const sql = `SELECT * FROM Videos WHERE id=${id}`;

    // Envia a query e recebe erros e resultados
    conexao.query(sql, (erro, resultados) => {
      // Pego o primeiro item do array e chamo de video
      const video = resultados[0];

      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(video); // devolvo um único objeto só (via id)
      }
    });
  }

  // Método para PATCH
  // Id do video; valores que devem ser alterados
  altera(id, valores, res) {
    // Query para atualizar o Video quando o id for igual tal id
    const sql = "UPDATE Videos SET ? WHERE id=?";

    // Dentro do Array para cada ?  -> são os valores e id
    conexao.query(sql, [valores, id], (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        // Envia de volta valores alterados e o id
        res.status(200).json({...valores, id}); 
      }
    });
  }

  // Método para DELETE
  deleta(id, res) {
    // Query para deletar um video a partir de um dado id
    const sql = "DELETE FROM Videos WHERE id=?";

    conexao.query(sql, id, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        // Envia de volta o id deletado
        res.status(200).json({id});
      }
    });
  }
}

module.exports = new Video();
